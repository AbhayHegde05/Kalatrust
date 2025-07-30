// models/programModel.js

const mongoose = require('mongoose');
const { Schema } = mongoose;
const slugify = require('slugify');

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  place: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  artists: [
    { type: String, trim: true }
  ]
}, {
  timestamps: true,
  collection: 'programs'
});

// Generate slug before validation if missing or if name changed
ProgramSchema.pre('validate', async function(next) {
  if (this.isModified('name') || !this.slug) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    // Ensure uniqueness by appending a counter if needed
    let count = 0;
    while (await this.constructor.exists({ slug })) {
      count += 1;
      slug = `${baseSlug}-${count}`;
    }
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model('Program', ProgramSchema);
