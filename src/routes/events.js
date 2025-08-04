// routes/events.js
const express = require('express');
const Event   = require('../models/programModel');
const Media   = require('../models/mediaModel');

const router  = express.Router();

// GET  /events          → list view
router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 }).lean();
    res.render('events.ejs', { events });
  } catch (err) {
    next(err);
  }
});

// GET  /events/:slug    → detail view
// routes/events.js
router.get('/:slug', async (req, res, next) => {
  console.log('→ DETAIL ROUTE HIT, slug =', req.params.slug);
  try {
    const event = await Event.findOne({ slug: req.params.slug }).lean();
    if (!event) {
      console.log('   ❌ No event found for slug:', req.params.slug);
      return next(); // 404
    }

    // ✅ fetch media related to this event
    const media = await Media.find({ program: event._id }).lean();

    console.log('   ✅ Found event:', event.name);
    res.render('event-details.ejs', { event, media }); // ✅ pass media too
  } catch (err) {
    console.error(err);
    next(err);
  }
});



module.exports = router;
