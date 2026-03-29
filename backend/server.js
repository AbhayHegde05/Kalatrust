require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const connectDB = require('./src/config/database');
const { configurePassport } = require('./src/middleware/auth');
const publicRoutes = require('./src/routes/publicRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
connectDB();

// --- CRITICAL FOR DEPLOYMENT ---
// This tells Express to trust the 'X-Forwarded-Proto' header from Render's proxy,
// which is necessary for the 'secure' cookie setting to work correctly.
app.set('trust proxy', 1);

const isProduction = process.env.NODE_ENV === 'production';

// --- Manual CORS headers (most reliable approach) ---
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowed = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : ['http://localhost:5173', 'http://localhost:3000'];

  if (!origin || allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  // Respond immediately to preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Session & Passport Configuration ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    // secure: true requires HTTPS — only enable in production (Render/Vercel)
    // In local dev over http://localhost it must be false or the browser drops the cookie
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// --- Routes ---
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend server running on http://localhost:${PORT}`));