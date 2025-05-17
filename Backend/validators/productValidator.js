const Joi = require('joi');
const mongoose = require('mongoose');

const productValidator = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().optional(),
  category: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId validation').required(),
  // images and shoppingLinks handled separately in routes
});

module.exports = productValidator;
