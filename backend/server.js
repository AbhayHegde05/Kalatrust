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

// --- Middleware ---
app.use(cors({
  // This is the corrected line:
  // Allow requests from your React frontend's origin
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Session & Passport ---
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
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