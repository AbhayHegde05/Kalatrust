// models/mediaModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;
const { makeEmbedUrl } = require('../utils/driveUtils');

const MediaSchema = new Schema({
  program: {
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
  },
  url:{ type: String, required: true }
}, {
  timestamps: true,
  collection: 'media'   // ← Explicitly set the collection name here
});

MediaSchema.pre('validate', function (next) {
  if (!this.url && this.driveLink) {
    const embed = makeEmbedUrl(this.driveLink, this.mediaType);
    if (!embed) {
      return next(new Error('Invalid Drive link for mediaType ' + this.mediaType));
    }
    this.url = embed;
  }
  next();
});

module.exports = mongoose.model('Media', MediaSchema);
