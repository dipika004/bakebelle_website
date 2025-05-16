const express = require('express');
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const { subscribeValidator, verifyValidator } = require('../validators/subscribeValidator');

let tempVerificationCodes = {}; // Temporary in-memory storage

// POST /subscribe - Send verification code
router.post('/', async (req, res) => {
  // Validate input email
  const { error } = subscribeValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email } = req.body;

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already subscribed.', emailExists: true });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    tempVerificationCodes[email] = code;

    await sendEmail(email, code);

    res.status(200).json({ message: 'Verification code sent to your email.' });
  } catch (err) {
    console.error('Error sending verification code:', err);
    res.status(500).json({ message: 'Failed to send verification code. Please try again later.' });
  }
});

// POST /verify - Verify code and save subscriber
router.post('/verify', async (req, res) => {
  // Validate input email and code
  const { error } = verifyValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, code } = req.body;

  try {
    const expectedCode = tempVerificationCodes[email];
    if (!expectedCode || expectedCode !== code) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    const newSubscriber = new Subscriber({ email, verified: true });
    await newSubscriber.save();

    delete tempVerificationCodes[email];

    // Send thank-you email (fire and forget)
    sendThankYouEmail(email);

    res.status(200).json({ message: 'Email verified and subscribed successfully!' });
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(500).json({ message: 'Failed to verify email. Please try again later.' });
  }
});

// ... your existing sendEmail and sendThankYouEmail helper functions unchanged

module.exports = router;
