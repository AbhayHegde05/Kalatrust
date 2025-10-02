const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({
  program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  url: { type: String, required: true },
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  caption: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);