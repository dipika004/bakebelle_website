// server.js or index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To use .env file

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Ensure this is defined in your .env file

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Failed to connect to MongoDB', err));

// === Schema Definitions ===

// Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Customer Query Schema
const customerQuerySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const CustomerQuery = mongoose.model('CustomerQuery', customerQuerySchema);

// Collab Query Schema
const collabQuerySchema = new mongoose.Schema({
  nameOrBrand: String,
  email: String,
  typeOfCollaboration: String,
  proposal: String,
  createdAt: { type: Date, default: Date.now },
});
const CollabQuery = mongoose.model('CollabQuery', collabQuerySchema);

// Dummy Product Model (add your actual schema if needed)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});
const Product = mongoose.model('Product', productSchema);

// === Routes ===

// Healthy breads route
app.get('/api/products/healthy-breads', async (req, res) => {
  try {
    const products = await Product.find({ category: 'bread' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// Subscribe route
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email is already subscribed.' });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing user', error });
  }
});

// Customer query route
app.post('/cust-query', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const query = new CustomerQuery({ name, email, message });
    await query.save();
    res.status(200).json({ message: 'Customer query submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving customer query', error });
  }
});

// Collaboration query route
app.post('/collab-query', async (req, res) => {
  const { nameOrBrand, email, typeOfCollaboration, proposal } = req.body;
  try {
    const collab = new CollabQuery({ nameOrBrand, email, typeOfCollaboration, proposal });
    await collab.save();
    res.status(200).json({ message: 'Collaboration query submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving collaboration query', error });
  }
});



// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
