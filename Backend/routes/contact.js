const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const contactSchema = require('../validators/contactValidator'); // Joi schema or similar

router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Destructure form data
    const { fullName, email, phone, subject, message } = req.body;
    console.log('Contact Form Submitted:', { fullName, email, phone, subject, message });

    // Save to MongoDB using ContactMessage model
    const newMessage = new ContactMessage({ fullName, email, phone, subject, message });
    await newMessage.save();

    res.status(200).json({ message: 'Message received successfully!' });
  } catch (err) {
    console.error('Error handling contact form:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
