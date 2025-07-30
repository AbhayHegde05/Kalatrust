// src/routes/adminRoutes.js

const express        = require('express')
const router         = express.Router()
const { ensureAuth } = require('../middleware/auth')  // destructured import
const Program        = require('../models/programModel')
const Media          = require('../models/mediaModel')

router.use(ensureAuth)  // Protect all /api/admin/*

// POST /api/admin/programs
router.post('/programs', async (req, res, next) => {
  try {
    const {
      name,
      date,
      place,
      description,
      artists = [],
      media   = []
    } = req.body

    if (!name || !date || !place || !description) {
      return res
        .status(400)
        .json({ error: 'name, date, place, and description are required.' })
    }

    const program = await Program.create({
      name,
      date,
      place,
      description,
      artists
    })

    if (Array.isArray(media) && media.length) {
      const mediaDocs = media.map(item => ({
        program:   program._id,
        driveLink: item.driveLink,
        mediaType: item.mediaType,
        caption:   item.caption || ''
      }))
      await Media.insertMany(mediaDocs)
    }

    return res
      .status(201)
      .json({ success: true, program })
  } catch (err) {
    next(err)
  }
})

// POST /api/admin/media
router.post('/media', async (req, res, next) => {
  try {
    const {
      programId,
      driveLink,
      mediaType,
      caption = ''
    } = req.body

    if (!programId || !driveLink) {
      return res
        .status(400)
        .json({ error: 'programId and driveLink are required.' })
    }

    const program = await Program.findById(programId)
    if (!program) {
      return res
        .status(404)
        .json({ error: 'Program not found.' })
    }

    const media = await Media.create({
      program:   programId,
      driveLink,
      mediaType,
      caption
    })

    return res
      .status(201)
      .json({ success: true, media })
  } catch (err) {
    next(err)
  }
})

module.exports = router
