const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  device: {
    type: String,
    enum: ['large', 'small'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Banner', bannerSchema);
