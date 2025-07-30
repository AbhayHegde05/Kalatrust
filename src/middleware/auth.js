// src/middleware/auth.js

const express       = require('express')
const path          = require('path')
const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy

const router = express.Router()

/**
 * Passport strategy, serialize/deserialize
 */
passport.use(
  new LocalStrategy((username, password, done) => {
    const ADMIN_USER = process.env.ADMIN_USER || 'admin'
    const ADMIN_PASS = process.env.ADMIN_PASS || 'secret'

    if (username === ADMIN_USER && password == ADMIN_PASS) {
      return done(null, { username })
    }
    return done(null, false, { message: 'Invalid credentials' })
  })
)

passport.serializeUser((user, done) => done(null, user.username))

passport.deserializeUser((username, done) => {
  const ADMIN_USER = process.env.ADMIN_USER || 'admin'
  if (username === ADMIN_USER) {
    return done(null, { username })
  }
  done(null, false)
})

/**
 * Route guard for protected endpoints
 */
function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/admin')
}

/**
 * Serve login form or admin page
 */
router.get('/admin', (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.sendFile(path.join(__dirname, '../public/login.html'))
  }
  return res.sendFile(path.join(__dirname, '../public/admin.html'))
})

/**
 * Handle login POST
 */
router.post(
  '/admin',
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin?error=1'
  })
)

router.use(
  '/admin',
  ensureAuth,
  express.static(path.join(__dirname, '../public/admin'))
);

/**
 * Logout endpoint
 */
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err)
    res.redirect('/admin')
  })
})

module.exports = {
  router,
  ensureAuth
}
