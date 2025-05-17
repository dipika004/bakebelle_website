const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Video = require('../models/Video');
const { createVideoValidator, updateVideoValidator } = require('../validators/videoValidator');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for video upload
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'product_videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mkv', 'avi', 'mov'],
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
}).single('videoFile');

// POST upload video
router.post('/', (req, res) => {
  videoUpload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'File upload error', error: err.message });
    }

    try {
      const { title, description } = req.body;

      // Validate input fields
      const { error } = createVideoValidator.validate({ title, description });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Video file is required.' });
      }

      // Save video data to DB
      const newVideo = new Video({
        title,
        description,
        videoUrl: req.file.path,
        publicId: req.file.filename,
      });

      await newVideo.save();
      return res.status(201).json(newVideo);
    } catch (error) {
      console.error('Error uploading video:', error);
      return res.status(500).json({ message: 'Error uploading video' });
    }
  });
});

// PUT update video (metadata + optional new file)
router.put('/:id', (req, res) => {
  videoUpload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'File upload error', error: err.message });
    }

    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    try {
      const { title, description } = req.body;

      // Validate input fields (optional fields)
      const { error } = updateVideoValidator.validate({ title, description });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const video = await Video.findById(req.params.id);
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }

      // If new video file is uploaded, delete old from Cloudinary and update
      if (req.file) {
        // Delete old video from Cloudinary
        await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' });

        // Update with new video info
        video.videoUrl = req.file.path;
        video.publicId = req.file.filename;
      }

      // Update text fields if provided
      if (title !== undefined) video.title = title;
      if (description !== undefined) video.description = description;

      await video.save();

      res.json(video);
    } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({ message: 'Error updating video' });
    }
  });
});

// GET all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Error fetching video' });
  }
});

// DELETE video
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Delete video from Cloudinary
    await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' });

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error deleting video' });
  }
});

module.exports = router;
