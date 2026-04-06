const express = require('express');
const router = express.Router();
const { getAllPrograms, getProgramBySlug } = require('../services/programService');
const { getMediaByProgram, addMedia } = require('../services/mediaService');
const { addReview, getReviewsByProgram } = require('../services/reviewService');
const { db } = require('../config/firebase');

// GET all events
router.get('/events', async (req, res) => {
  try {
    const programs = await getAllPrograms();
    const mediaSnapshot = await db.collection('media').get();
    const media = mediaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    const mediaMap = media.reduce((acc, m) => {
      (acc[m.program] = acc[m.program] || []).push(m);
      return acc;
    }, {});
    
    res.json(programs.map(p => ({ ...p, media: mediaMap[p.id] || [] })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET single event by slug
router.get('/events/:slug', async (req, res) => {
  try {
    const event = await getProgramBySlug(req.params.slug);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const media = await getMediaByProgram(event.id);
    const reviews = await getReviewsByProgram(event.id);
    
    res.json({ ...event, media, reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST review for an event
router.post('/events/:slug/reviews', async (req, res) => {
  try {
    const event = await getProgramBySlug(req.params.slug);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    const { name, rating, comment } = req.body;
    if (!name || !rating || !comment) return res.status(400).json({ message: 'All fields required' });
    
    const review = await addReview({ 
      program: event.id, 
      name, 
      rating: Number(rating), 
      comment 
    });
    
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET gallery
router.get('/gallery', async (req, res) => {
  try {
    const mediaSnapshot = await db.collection('media').orderBy('createdAt', 'desc').get();
    const media = mediaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
