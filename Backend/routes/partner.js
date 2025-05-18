const express = require('express');
const router = express.Router();
const PartnerRequest = require('../models/PartnerRequest');

router.post('/', async (req, res) => {
  try {
    const partner = new PartnerRequest(req.body);
    await partner.save();
    res.status(201).json({ message: 'Partnership request sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving partner request' });
  }
});

module.exports = router;
