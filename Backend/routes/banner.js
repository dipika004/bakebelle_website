const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Banner = require('../models/Banner');
const bannerValidator = require('../validators/bannerValidator');

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage logic for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const device = file.fieldname === 'largeBanner' ? 'large' : 'small';
    return {
      folder: 'banners',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      public_id: `${Date.now()}_${device}`,
    };
  },
});

const upload = multer({ storage });

// GET all banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    console.error('GET /banner Error:', err);
    res.status(500).json({ message: 'Error retrieving banners', error: err.message });
  }
});

// POST upload large and/or small banners
router.post('/', upload.fields([
  { name: 'largeBanner' }, 
  { name: 'smallBanner' }
]), async (req, res) => {
  try {
    const largeFile = req.files['largeBanner']?.[0];
    const smallFile = req.files['smallBanner']?.[0];

    if (!largeFile || !smallFile) {
      return res.status(400).json({ message: "Both banners required" });
    }

    console.log("Uploaded to Cloudinary:", {
      largeURL: largeFile.path,
      largePublicId: largeFile.filename,
      smallURL: smallFile.path,
      smallPublicId: smallFile.filename
    });

    const largeBanner = new Banner({
      image: largeFile.path,
      public_id: largeFile.filename,
      device: 'large',
    });

    const smallBanner = new Banner({
      image: smallFile.path,
      public_id: smallFile.filename,
      device: 'small',
    });

    await largeBanner.save();
    await smallBanner.save();

    res.status(200).json({ message: 'Both banners uploaded successfully!' });

  } catch (error) {
    console.error('❌ Banner Upload Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});



module.exports = router;
