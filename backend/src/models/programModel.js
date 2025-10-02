const mongoose = require('mongoose');
const slugify = require('slugify');

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  date: { type: Date, required: true },
  place: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  artists: [{ type: String, trim: true }]
}, { timestamps: true });

// Middleware to automatically create a URL-friendly slug from the event name
ProgramSchema.pre('save', async function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
  }
  next();
});

module.exports = mongoose.model('Program', ProgramSchema);