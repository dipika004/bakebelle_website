
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const Message = require('../models/Message');
const Subscriber = require('../models/Subscriber');
const messageValidator = require('../validators/messageValidator');

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'admin-messages',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});
const upload = multer({ storage });

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route: POST /api/send-message
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const messageText = req.body.message;
    const imageUrl = req.file ? req.file.path : null;

    // Validate input using messageValidator
    const { error } = messageValidator.validate({
      body: messageText,
      imageUrl: imageUrl,
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    // Save message to MongoDB
    const newMessage = new Message({
      body: messageText,
      imageUrl,
      timestamp: new Date(),
    });

    await newMessage.save();

    // Get verified subscribers
    const subscribers = await Subscriber.find({ verified: true });

    // Send email to each verified subscriber
    await Promise.all(subscribers.map(subscriber => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: 'New Message from thejaganbowl',
        html: `
          <p>${messageText}</p>
          ${imageUrl ? `<img src="${imageUrl}" alt="Message Image" style="max-width: 100%; height: auto;" />` : ''}
        `,
      };
      return transporter.sendMail(mailOptions).catch(err =>
        console.error(`Email error to ${subscriber.email}:`, err)
      );
    }));

    res.status(200).json({
      success: true,
      message: 'Message sent and saved!',
      data: newMessage,
    });

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
