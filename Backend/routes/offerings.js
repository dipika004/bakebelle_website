const express = require('express');
const router = express.Router();
const Offering = require('../models/offerings');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const offeringValidator = require('../validators/offeringValidator'); // Make sure this exports a function

// Get all offerings
router.get('/', async (req, res) => {
  try {
    const offerings = await Offering.find();
    res.json(offerings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get offering by slug
router.get('/:slug', async (req, res) => {
  try {
    const offering = await Offering.findOne({ slug: req.params.slug });
    if (!offering) {
      return res.status(404).json({ message: 'Offering not found' });
    }
    res.json(offering);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new offering
router.post('/', async (req, res) => {
  // Validate input
  const { error } = offeringValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newOffering = new Offering({ name: req.body.name });
    const savedOffering = await newOffering.save();
    res.status(201).json(savedOffering);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an offering
router.put('/:id', async (req, res) => {
  // Validate input
  const { error } = offeringValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const updatedOffering = await Offering.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );

    if (updatedOffering) {
      res.json(updatedOffering);
    } else {
      res.status(404).json({ message: 'Offering not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an offering and its related products
router.delete('/:id', async (req, res) => {
  try {
    console.log("Deleting offering with ID:", req.params.id);
    const offering = await Offering.findById(req.params.id);

    if (!offering) {
      console.log("Offering not found");
      return res.status(404).json({ message: 'Offering not found' });
    }

    console.log("Found offering:", offering);

    // Find related products
    const relatedProducts = await Product.find({ category: offering._id });
    console.log("Matched products:", relatedProducts.length);

    // Delete related products
    await Product.deleteMany({ category: offering._id });

    console.log("Deleted related products.");

    // Delete offering itself
    await Offering.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Offering and its products deleted' });
  } catch (err) {
    console.error("Error deleting offering:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
