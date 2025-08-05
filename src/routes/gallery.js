// routes/gallery.js
const express = require('express');
const router = express.Router();
const Media = require('../models/media');

router.get('/gallery', async (req, res) => {
  const media = await Media.find().lean();
  res.render('gallery', { media });
});
