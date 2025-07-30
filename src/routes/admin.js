// src/routes/admin.js

const express        = require('express')
const router         = express.Router()
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, (req, res) => {
  res.send('Welcome to the Admin Dashboard')
})

router.get('/settings', ensureAuth, (req, res) => {
  res.send('Admin Settings Page')
})

module.exports = router
