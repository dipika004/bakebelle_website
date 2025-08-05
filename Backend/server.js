const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const offeringsRoutes = require('./routes/offerings');
const productsRoutes = require('./routes/products');
const bannerRoutes = require('./routes/banner');
const videoRoutes = require('./routes/video');
const subscribeRoutes = require('./routes/subscribe');
const sendMessageRoutes = require('./routes/sendMessage');
const contactForm=require("./routes/contact");
const partnerForm=require("./routes/partner");
const path = require('path');
require('dotenv').config(); // Load env variables

const app = express();
const port = process.env.PORT || 8080; // fallback if env not set

// Middleware
app.use(cors({
   origin: ['http://localhost:5173', 'https://bakebelle-website.onrender.com', 'https://bakebelle.onrender.com']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/offerings', offeringsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/subscribe', subscribeRoutes);
app.use('/api/send-message', sendMessageRoutes);
app.use('/api/contact', contactForm);
app.use('/api/partner-contact', partnerForm);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Jagan Bowl');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
