const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Banner = require('../models/Banner');
const bannerValidator = require('../validators/bannerValidator');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'banners',
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});

const upload = multer({ storage });

// GET all banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving banners', error: err.message });
  }
});

// POST create/upload a new banner
router.post('/', upload.single('banner'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No banner image uploaded' });
    }

    const image = req.file.path;     // Cloudinary URL of uploaded image
    const public_id = req.file.filename;

    const { error } = bannerValidator.validate({ image, public_id });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newBanner = new Banner({
      image,
      public_id,
      title: req.body.title || '',  // Optional title if you want
    });

    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading banner', error: err.message });
  }
});


// PUT update banner
router.put('/:id', upload.single('banner'), async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    let image = banner.image;
    let public_id = banner.public_id;

    if (req.file) {
      image = req.file.path;
      public_id = req.file.filename;
    }

    const { error } = bannerValidator.validate({ image, public_id });
    if (error) return res.status(400).json({ message: error.details[0].message });

    banner.image = image;
    banner.public_id = public_id;

    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Error updating banner', error: err.message });
  }
});

// PUT update banner
router.put('/:id', upload.single('banner'), async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    let image = banner.image;
    let public_id = banner.public_id;

    if (req.file) {
      image = req.file.path;
      public_id = req.file.filename;
    }

    const { error } = bannerValidator.validate({
      image,
      public_id,
      title: req.body.title || banner.title
    });

    if (error) return res.status(400).json({ message: error.details[0].message });

    banner.image = image;
    banner.public_id = public_id;
    banner.title = req.body.title || banner.title;

    await banner.save();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Error updating banner', error: err.message });
  }
});

// DELETE banner
router.delete('/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting banner', error: err.message });
  }
});

module.exports = router;
