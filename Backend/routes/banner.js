const express = require('express');
const router = express.Router();
const Banner = require('../models/Banner');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const bannerValidator = require('../validators/bannerValidator');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'banner_images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    public_id: (req, file) => `banner_${Date.now()}` // Unique name
  },
});

const upload = multer({ storage: storage }).single('banner');

// @route GET /api/banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    console.error('Error fetching banners:', err);
    res.status(500).json({ message: 'Error fetching banners', error: err.message });
  }
});

// @route POST /api/banners
// POST /api/banners
router.post('/', upload, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a banner image' });
    }

    const { error } = bannerValidator.validate({ image: req.file.path, title: req.body.title , public_id:req.file.filename});
    if (error) return res.status(400).json({ message: error.details[0].message });

    const banner = new Banner({
      image: req.file.path,
      public_id: req.file.filename,
      title: req.body.title || '',
    });

    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    console.error('Error uploading banner:', err);
    res.status(500).json({ message: 'Error uploading banner', error: err.message });
  }
});

// @route PUT /api/banners/:id
router.put('/:id', upload, async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    let image = banner.image;
    let public_id = banner.public_id;

    if (req.file) {
      // Optionally delete the old image from Cloudinary if needed
      // await cloudinary.uploader.destroy(banner.public_id);

      image = req.file.path;
      public_id = req.file.filename;
    }

    const { error } = bannerValidator.validate({
      image,
      public_id,
      title: req.body.title || banner.title,
    });

    if (error) return res.status(400).json({ message: error.details[0].message });

    banner.image = image;
    banner.public_id = public_id;
    banner.title = req.body.title || banner.title;

    await banner.save();
    res.json(banner);
  } catch (err) {
    console.error('Error updating banner:', err);
    res.status(500).json({ message: 'Error updating banner', error: err.message });
  }
});


// @route DELETE /api/banners/:id
router.delete('/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    await cloudinary.uploader.destroy(banner.public_id); // delete from cloudinary

    await banner.deleteOne();
    res.json({ message: 'Banner deleted successfully' });
  } catch (err) {
    console.error('Error deleting banner:', err);
    res.status(500).json({ message: 'Error deleting banner', error: err.message });
  }
});


module.exports = router;
