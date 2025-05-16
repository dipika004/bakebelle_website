// models/Offering.js

const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to generate slug from name
offeringSchema.pre('validate', function (next) {
  if (this.name) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

const Offering = mongoose.model('Offering', offeringSchema);

module.exports = Offering;
