// models/mediaModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  driveLink: {
    type: String,
    required: true,
    trim: true
  },
  mediaType: {
    type: String,
    enum: ['drive-img', 'drive-video'],
    required: true
  },
  caption: {
    type: String,
    trim: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'media'   // ← Explicitly set the collection name here
});

module.exports = mongoose.model('Media', MediaSchema);
