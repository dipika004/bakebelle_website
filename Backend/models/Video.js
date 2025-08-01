// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },  // Store Cloudinary video URL
  publicId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
