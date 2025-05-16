// models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String, // URL from Cloudinary or local storage
    required: true,
  },
  public_id: {
    type: String,
    required:true // Optional, if you want to store the public ID from Cloudinary
  },
  title: String,  // Optional
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Banner', bannerSchema);
