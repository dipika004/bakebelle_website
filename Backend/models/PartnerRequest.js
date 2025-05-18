const mongoose = require('mongoose');

const PartnerRequestSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  partnershipType: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PartnerRequest', PartnerRequestSchema);
