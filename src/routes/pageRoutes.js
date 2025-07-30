// src/routes/pageRoutes.js

const express        = require('express')
const path           = require('path')
const router         = express.Router()
const Event          = require('../models/programModel')
const { ensureAuth } = require('../middleware/auth')  // destructured import

const publicDir = path.resolve(__dirname, '..', 'public')

router.get('/',       (req, res) => res.sendFile(path.join(publicDir, 'index.html')))
router.get('/about',  (req, res) => res.sendFile(path.join(publicDir, 'about.html')))
router.get('/gallery',(req, res) => res.sendFile(path.join(publicDir, 'gallery.html')))
router.get('/contact',(req, res) => res.sendFile(path.join(publicDir, 'contact.html')))

router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.render('events', { events })
  } catch (err) {
    next(err)
  }
})

// Serve admin UI under /admin (static assets)
router.use(
  '/admin',
  ensureAuth,
  express.static(path.join(publicDir, 'admin'))
)

module.exports = router
