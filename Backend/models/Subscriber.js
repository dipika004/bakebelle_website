const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  }
  // If you want to support token-based in future, you can add:
  // verificationToken: String,
  // tokenExpiresAt: Date
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
