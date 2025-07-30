// app.js

const express           = require('express')
const path              = require('path')
const session           = require('express-session')
const passport          = require('passport')

const connectDB         = require('./config/database')
const pageRoutes        = require('./routes/pageRoutes')
const eventRoutes       = require('./routes/events')
const adminApiRouter    = require('./routes/adminRoutes')
const adminUiRouter     = require('./routes/admin')         // optional UI routes

const { router: authRouter, ensureAuth } = require('./middleware/auth')

const app = express()
connectDB()

// View engine & parsers
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json(), express.urlencoded({ extended: true }))

// Session & Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'CHANGE_THIS',
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

// Mount auth (login, logout, admin HTML pages)
app.use(authRouter)

// Mount UI-specific admin routes (if you need dynamic pages/API)
app.use('/admin/dashboard', adminUiRouter)

// Protect all JSON admin API endpoints
app.use('/api/admin', ensureAuth, adminApiRouter)

// Public pages & assets
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', pageRoutes)
app.use('/events', eventRoutes)

// 404 fallback
app.use((req, res) => res.status(404).send('Page not found'))

module.exports = app
