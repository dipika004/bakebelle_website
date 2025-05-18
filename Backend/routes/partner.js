const express = require('express');
const router = express.Router();
const PartnerRequest = require('../models/PartnerRequest');
const { validatePartnerRequest } = require('../validators/partnerValidator');

router.post('/', async (req, res) => {
  // Validate the incoming data
  const { error } = validatePartnerRequest(req.body);

  if (error) {
    // Collect all validation error messages
    const messages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    // Create new PartnerRequest with validated data
    const partnerRequest = new PartnerRequest(req.body);
    await partnerRequest.save();

    res.status(201).json({ message: 'Partner request submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

module.exports = router;
