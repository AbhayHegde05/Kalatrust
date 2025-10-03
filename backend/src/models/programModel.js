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

// This middleware runs before a document is saved
ProgramSchema.pre('save', async function(next) {
  // Only generate a new slug if the name has changed or it's a new event
  if (this.isModified('name') || this.isNew) {
    let baseSlug = slugify(this.name, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    
    let slug = baseSlug;
    let counter = 1;

    // This loop checks if a document with the same slug already exists
    // and appends a number until a unique slug is found.
    while (await this.constructor.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model('Program', ProgramSchema);