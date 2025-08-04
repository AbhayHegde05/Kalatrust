// models/mediaModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  url: {           // ✅ Cloudinary URL
    type: String,
    required: true,
    trim: true
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'], // ✅ Use clean types
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
  collection: 'media'
});

module.exports = mongoose.model('Media', MediaSchema);
