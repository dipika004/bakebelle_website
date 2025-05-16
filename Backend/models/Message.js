const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, // URL of the image stored in Cloudinary
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);
