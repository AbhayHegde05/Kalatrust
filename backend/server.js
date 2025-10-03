require('dotenv').config();
const express = require('express');
const cors = require('cors');
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

// --- Middleware ---
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- UPDATED Session & Passport Configuration ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    // These settings are required for cross-domain cookies
    secure: true, // Only send cookie over HTTPS
    sameSite: 'none', // Allow cookie to be sent from a different domain
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    maxAge: 1000 * 60 * 60 * 24 // Cookie expires in 1 day
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