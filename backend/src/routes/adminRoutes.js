const express = require('express');
const router = express.Router();
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
const { ensureAuth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const Program = require('../models/programModel');
const Media = require('../models/mediaModel');

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Publicly Accessible Admin Routes (for authentication) ---

/**
 * @route   POST /api/admin
 * @desc    Handles the admin login form submission.
 * @access  Public
 */
router.post('/', (req, res, next) => {
  console.log('Login request received at POST /api/admin');
  // Use a custom callback for passport to handle success/failure explicitly
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Passport authentication error:', err);
      return next(err);
    }
    if (!user) {
      // Authentication failed. 'info' contains the message from the strategy.
      console.log('Authentication failed:', info.message);
      return res.status(401).json({ success: false, message: info.message || 'Invalid credentials' });
    }
    // Authentication succeeded. Manually log the user in to establish a session.
    req.logIn(user, (err) => {
      if (err) {
        console.error('Session login error:', err);
        return next(err);
      }
      console.log('User successfully logged in, session created.');
      return res.json({ success: true, user: user });
    });
  })(req, res, next);
});

/**
 * @route   POST /api/admin/logout
 * @desc    Logs the current user out.
 * @access  Public
 */
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) { return next(err); }
    console.log('User logged out successfully.');
    res.json({ success: true, message: "Logged out" });
  });
});

/**
 * @route   GET /api/admin/user
 * @desc    Checks if a user is currently authenticated via session.
 * @access  Public
 */
router.get('/user', (req, res) => {
  res.json({ user: req.user || null });
});


// --- Protected Admin Routes ---
// Any route defined below this middleware will require an active session.
router.use(ensureAuth);

// --- Program (Event) CRUD API ---

router.get('/programs', async (req, res) => {
  const programs = await Program.find().sort({ date: -1 });
  res.json(programs);
});

router.get('/programs/:id', async (req, res) => {
  const program = await Program.findById(req.params.id).lean();
  const media = await Media.find({ program: req.params.id }).lean();
  res.json({ ...program, media });
});

router.post('/programs', async (req, res) => {
  const newProgram = await Program.create(req.body);
  res.status(201).json(newProgram);
});

router.put('/programs/:id', async (req, res) => {
  const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProgram);
});

router.delete('/programs/:id', async (req, res) => {
  await Program.findByIdAndDelete(req.params.id);
  await Media.deleteMany({ program: req.params.id });
  res.json({ success: true });
});

// --- Media Management API ---

router.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    // Map each file to an upload promise
    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, { resource_type: 'auto' })
    );

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);

    // Format the response
    const uploadedFiles = results.map((result, index) => ({
      url: result.secure_url,
      mediaType: req.files[index].mimetype.startsWith('video') ? 'video' : 'image',
    }));

    res.json(uploadedFiles);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: 'File upload failed', error });
  }
});


router.post('/media', async (req, res) => {
  const newMedia = await Media.create(req.body);
  res.status(201).json(newMedia);
});

router.delete('/media/:id', async (req, res) => {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;