const express = require('express');
const router = express.Router();
const Program = require('../models/programModel');
const Media = require('../models/mediaModel');

// GET all events for the public events page
router.get('/events', async (req, res) => {
  try {
    const programs = await Program.find().sort({ date: -1 }).lean();
    const media = await Media.find({ program: { $in: programs.map(p => p._id) } }).lean();
    
    const mediaMap = media.reduce((acc, m) => {
      (acc[m.program] = acc[m.program] || []).push(m);
      return acc;
    }, {});

    const eventsWithMedia = programs.map(p => ({ ...p, media: mediaMap[p._id] || [] }));
    res.json(eventsWithMedia);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a single event by its slug for the details page
router.get('/events/:slug', async (req, res) => {
  try {
    const event = await Program.findOne({ slug: req.params.slug }).lean();
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const media = await Media.find({ program: event._id }).lean();
    res.json({ ...event, media });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET all media for the public gallery page
router.get('/gallery', async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 }).lean();
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;