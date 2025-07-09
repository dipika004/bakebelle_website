// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  images: [String],
  shoppingLinks: {
    zepto: String,
    instamart: String,
    blinkit: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offering', // Reference to the offerings collection
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
