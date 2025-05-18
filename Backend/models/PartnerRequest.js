const mongoose = require('mongoose');

const partnerContactModel = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  companyName: { type: String, required: true },
  partnershipType: { 
    type: String,
    enum: ['Reseller', 'Distributor', 'Marketing Partner', 'Technology Partner', 'Other'],
    required: true,
  },
  website: { type: String }, // optional, no strict validation at DB level
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PartnerContact', partnerContactModel);
