// routes/subscribe.js
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Subscriber = require('../models/Subscriber');
const { subscribeValidator, verifyValidator } = require('../validators/subscribeValidator');

dotenv.config();

const router = express.Router();

let tempVerificationCodes = {}; // Temporary in-memory store

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code}`,
  };
  await transporter.sendMail(mailOptions);
};

const sendThankYouEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Thank You for Subscribing!',
    text: 'You have successfully subscribed to our newsletter.',
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Error sending thank-you email:', err);
    else console.log('Thank-you email sent:', info.response);
  });
};

// POST /subscribe - send verification code
router.post('/', async (req, res) => {
  const { error } = subscribeValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email } = req.body;

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already subscribed.', emailExists: true });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    tempVerificationCodes[email] = code;

    await sendEmail(email, code);

    res.status(200).json({ message: 'Verification code sent to your email.' });
  } catch (err) {
    console.error('Error sending verification code:', err);
    res.status(500).json({ message: 'Failed to send verification code. Please try again later.' });
  }
});

// POST /verify - verify code and save subscriber
router.post('/verify', async (req, res) => {
  const { error } = verifyValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, code } = req.body;

  try {
    const expectedCode = tempVerificationCodes[email];
    if (!expectedCode || expectedCode !== code) {
      return res.status(400).json({ message: 'Invalid or expired verification code.' });
    }

    // Check if subscriber already exists
    const existing = await Subscriber.findOne({ email });
    if (existing && existing.verified) {
      return res.status(400).json({ message: 'Email already verified and subscribed.' });
    } else if (existing && !existing.verified) {
      existing.verified = true;
      await existing.save();
    } else {
      const newSubscriber = new Subscriber({ email, verified: true });
      await newSubscriber.save();
    }

    delete tempVerificationCodes[email];

    sendThankYouEmail(email);

    res.status(200).json({ message: 'Email verified and subscribed successfully!' });
  } catch (err) {
    console.error('Error verifying email:', err);
    res.status(500).json({ message: 'Failed to verify email. Please try again later.' });
  }
});

module.exports = router;
