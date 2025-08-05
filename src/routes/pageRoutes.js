// src/routes/pageRoutes.js

const express        = require('express');
const path           = require('path');
const router         = express.Router();
const Program        = require('../models/programModel');
const Media          = require('../models/mediaModel');
const { ensureAuth } = require('../middleware/auth');



const publicDir = path.resolve(__dirname, '..', 'public');

// — Static pages
router.get('/',       (req, res) => res.sendFile(path.join(publicDir, 'index.html')));
router.get('/about',  (req, res) => res.sendFile(path.join(publicDir, 'about.html')));

router.get('/contact',(req, res) => res.sendFile(path.join(publicDir, 'contact.html')));

// — List all events with their media
router.get('/events', async (req, res, next) => {
  try {
    // 1) Fetch events
    let events = await Program.find()
      .sort({ date: 1 })
      .lean();

    // 2) Bulk-fetch media for those events
    const mediaDocs = await Media.find({
      program: { $in: events.map(e => e._id) }
    })
    .select('program url mediaType caption')
    .lean();

    // 3) Map media into each event object
    const mediaMap = mediaDocs.reduce((acc, m) => {
      acc[m.program] = acc[m.program] || [];
      acc[m.program].push({
        url:       m.url,
        type:      m.mediaType,
        caption:   m.caption
      });
      return acc;
    }, {});

    events = events.map(ev => ({
      ...ev,
      media: mediaMap[ev._id] || []
    }));

    // 4) Render the EJS view
    res.render('events', { events });
  } catch (err) {
    next(err);
  }
});

// — Detail page for a single event
// router.get('/events/:slug', async (req, res, next) => {
//   try {
//     const event = await Program.findOne({ slug: req.params.slug }).lean();
//     if (!event) return res.status(404).send('Event not found');

//     const media = await Media.find({ program: event._id })
//       .select('url mediaType caption')
//       .lean();

//     event.media = media;
//     res.render('event-details', { event });
//   } catch (err) {
//     next(err);
//   }
// });

// — Serve Admin UI under /admin
router.use(
  '/admin',
  ensureAuth,
  express.static(path.join(publicDir, 'admin'))
);

router.get('/gallery', async (req, res) => {
  try {
    const item = await Media.find(); // Assuming Gallery is your model
    res.render('gallery', { media : item });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;