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

// PUT update banner
router.put('/:id', upload.single('banner'), async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });

    let image = banner.image;
    let public_id = banner.public_id;

    // If a new image is uploaded, replace the old one on Cloudinary
    if (req.file) {
      // Delete old image from Cloudinary
      if (banner.public_id) {
        await cloudinary.uploader.destroy(banner.public_id);
      }

      // Assign new image details
      image = req.file.path;
      public_id = req.file.filename;
    }

    const updatedData = {
      image,
      public_id,
      title: req.body.title || banner.title,
      device: req.body.device || banner.device,
    };

    // Validate updated data
    const { error } = bannerValidator.validate(updatedData);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Update and save
    banner.image = updatedData.image;
    banner.public_id = updatedData.public_id;
    banner.title = updatedData.title;
    banner.device = updatedData.device;

    await banner.save();

    res.status(200).json({ message: 'Banner updated successfully', banner });
  } catch (err) {
    console.error('❌ Error updating banner:', err);
    res.status(500).json({ message: 'Error updating banner', error: err.message });
  }
});

// DELETE banner
router.delete('/:id', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    await cloudinary.uploader.destroy(banner.public_id);
    res.json({ message: 'Banner deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting banner', error: err.message });
  }
});

module.exports = router;
