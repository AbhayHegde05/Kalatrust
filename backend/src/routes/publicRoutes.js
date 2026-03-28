const express = require('express');
const router = express.Router();
const Program = require('../models/programModel');
const Media = require('../models/mediaModel');
const Review = require('../models/reviewModel');

// GET all events
router.get('/events', async (req, res) => {
  try {
    const programs = await Program.find().sort({ date: -1 }).lean();
    const media = await Media.find({ program: { $in: programs.map(p => p._id) } }).lean();
    const mediaMap = media.reduce((acc, m) => {
      (acc[m.program] = acc[m.program] || []).push(m);
      return acc;
    }, {});
    res.json(programs.map(p => ({ ...p, media: mediaMap[p._id] || [] })));
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET single event by slug
router.get('/events/:slug', async (req, res) => {
  try {
    const event = await Program.findOne({ slug: req.params.slug }).lean();
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const media = await Media.find({ program: event._id }).lean();
    const reviews = await Review.find({ program: event._id, approved: true }).sort({ createdAt: -1 }).lean();
    res.json({ ...event, media, reviews });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST review for an event
router.post('/events/:slug/reviews', async (req, res) => {
  try {
    const event = await Program.findOne({ slug: req.params.slug }).lean();
    if (!event) return res.status(404).json({ message: 'Event not found' });
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) return res.status(400).json({ message: 'All fields required' });
    const review = await Review.create({ program: event._id, name, rating: Number(rating), comment });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET gallery
router.get('/gallery', async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 }).lean();
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
