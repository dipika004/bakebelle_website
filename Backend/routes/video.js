const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Video = require('../models/Video');
const router = express.Router();
const videoValidator = require('../validators/videoValidator');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage for video upload
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mkv', 'avi', 'mov'],
  },
});

const videoUpload = multer({
  storage: videoStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB size limit
}).single('videoFile');

// Middleware to handle multer errors
function multerErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Other unknown errors
    return res.status(500).json({ message: 'File upload error', error: err.message });
  }
  next();
}

// POST video upload
router.post('/', (req, res) => {
  videoUpload(req, res, async function (err) {
    if (err) {
      // Multer errors handled here
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'File upload error', error: err.message });
    }

    try {
      const { title, description } = req.body;

      // Validate input fields
      const { error } = videoValidator({ title, description });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Video file is required.' });
      }

      const newVideo = new Video({
        title,
        description,
        videoUrl: req.file.path,
        publicId: req.file.filename, // Save Cloudinary public ID
      });

      await newVideo.save();
      res.status(201).json(newVideo);
    } catch (error) {
      console.error('Error uploading video:', error);
      res.status(500).json({ message: 'Error uploading video' });
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

// GET a single video by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Error fetching video' });
  }
});

// DELETE a video
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Delete video from Cloudinary by publicId, specify resource_type video
    await cloudinary.uploader.destroy(video.publicId, { resource_type: 'video' });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Error deleting video' });
  }
});

// UPDATE a video
router.put('/:id', (req, res) => {
  videoUpload(req, res, async function (err) {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: 'File upload error', error: err.message });
    }

    try {
      const { id } = req.params;
      const { title, description } = req.body;

      // Validate at least one field present
      if (!title && !description && !req.file) {
        return res.status(400).json({ message: 'No fields to update.' });
      }

      // Validate fields if provided
      const { error } = videoValidator({ title: title || '', description: description || '' });
      if (error && (title || description)) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const updateFields = {};
      if (title) updateFields.title = title;
      if (description) updateFields.description = description;
      if (req.file) {
        updateFields.videoUrl = req.file.path;
        updateFields.publicId = req.file.filename;
      }

      const updatedVideo = await Video.findByIdAndUpdate(id, updateFields, { new: true });

      if (!updatedVideo) {
        return res.status(404).json({ message: 'Video not found' });
      }

      res.status(200).json(updatedVideo);
    } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({ message: 'Error updating video' });
    }
  });
});

module.exports = router;
