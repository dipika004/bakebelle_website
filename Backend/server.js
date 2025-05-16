const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const offeringsRoutes = require('./routes/offerings');
const productsRoutes = require('./routes/products');
const bannerRoutes = require('./routes/banner');
const videoRoutes = require('./routes/video');
const subscribeRoutes = require('./routes/subscribe');
const sendMessageRoutes = require('./routes/sendMessage');
const path = require('path');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/offerings', offeringsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/send-message', sendMessageRoutes);

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/thejaganbowl')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Jagan Bowl');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
