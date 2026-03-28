const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  name: { type: String, required: true, trim: true, maxlength: 80 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 600 },
  approved: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
