const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
