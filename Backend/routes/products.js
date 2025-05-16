const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Product = require('../models/Product');
const Offering = require('../models/offerings');
const productValidator = require('../validators/productValidator'); // Use require for consistency

const router = express.Router();

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product_images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
  },
});

const upload = multer({ storage: storage }).array('images', 10);

// Get products by category slug
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const offering = await Offering.findOne({ slug: category });
    if (!offering) return res.status(404).json({ message: 'Offering not found' });

    const products = await Product.find({ category: offering._id });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products by category slug:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Search products by title query
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const products = await Product.find({
      title: { $regex: query, $options: 'i' },
    }).select('_id title images');
    res.json(products);
  } catch (err) {
    console.error('Error searching products:', err);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get products by category ID
router.get('/category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by categoryId:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Add a new product with images
router.post('/', upload, async (req, res) => {
  try {
    // Validate inputs (assuming productValidator validates fields like title, price, etc.)
    const validation = productValidator.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const { title, price, description, shoppingLinks, category } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required.' });
    }

    const offering = await Offering.findById(category);
    if (!offering) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    let shoppingLinksObj = {};
    if (shoppingLinks) {
      try {
        shoppingLinksObj = JSON.parse(shoppingLinks);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid shoppingLinks format.' });
      }
    }

    const imageUrls = req.files.map(file => file.path);

    const newProduct = new Product({
      title,
      price,
      description,
      shoppingLinks: shoppingLinksObj,
      category: offering._id,
      images: imageUrls,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ message: 'Error uploading product' });
  }
});

// Edit product details (PUT)
router.put('/:id', upload, async (req, res) => {
  try {
    const validation = productValidator.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const { title, price, description, category, shoppingLinks } = req.body;
    const productId = req.params.id;

    let shoppingLinksObj = {};
    if (shoppingLinks) {
      try {
        shoppingLinksObj = JSON.parse(shoppingLinks);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid shoppingLinks format.' });
      }
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const offering = await Offering.findById(category);
    if (!offering) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    let imageUrls = existingProduct.images;
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file => file.path);
    }

    existingProduct.title = title;
    existingProduct.price = price;
    existingProduct.description = description;
    existingProduct.shoppingLinks = shoppingLinksObj;
    existingProduct.category = offering._id;
    existingProduct.images = imageUrls;

    const updatedProduct = await existingProduct.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product (DELETE)
// Delete product (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete each image from Cloudinary
    for (const imageUrl of product.images) {
      // Example URL format: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/folder_name/public_id.jpg
      // Extract public_id by removing the base URL and extension
      // Assuming images are stored in folder 'product_images'
      const segments = imageUrl.split('/');
      const fileName = segments[segments.length - 1];  // e.g. 'public_id.jpg'
      const publicIdWithExtension = `product_images/${fileName}`;
      const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // Remove extension

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error(`Failed to delete image ${publicId} from Cloudinary`, err);
        // You can decide to continue or return error here
      }
    }

    // Delete product from DB
    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: 'Product deleted successfully!' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});


module.exports = router;
