// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Failed to connect to MongoDB', err));

// === Schema Definitions ===

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

const customerQuerySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
const CustomerQuery = mongoose.model('CustomerQuery', customerQuerySchema);

const collabQuerySchema = new mongoose.Schema({
  nameOrBrand: String,
  email: String,
  typeOfCollaboration: String,
  proposal: String,
  createdAt: { type: Date, default: Date.now },
});
const CollabQuery = mongoose.model('CollabQuery', collabQuerySchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
});
const Product = mongoose.model('Product', productSchema);

// === Routes ===

app.get('/api/products/healthy-breads', async (req, res) => {
  try {
    const products = await Product.find({ category: 'bread' });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

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
