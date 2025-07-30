// config/db.js

const mongoose = require('mongoose');
const Program  = require('../models/programModel');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✔️  MongoDB connected');

    // One-time backfill for existing programs without a slug
    const missing = await Program.find({ slug: { $exists: false } });
    if (missing.length) {
      for (const doc of missing) {
        await doc.validate();   // triggers the pre-validate slug generation
        await doc.save();       // persists the generated slug
        console.log(`• Added slug for "${doc.name}": ${doc.slug}`);
      }
      console.log(`✔️  Backfilled ${missing.length} slug(s)`);
    }

  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
