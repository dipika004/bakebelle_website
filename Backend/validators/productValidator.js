// validators/productValidator.js
const Joi = require('joi');
const mongoose = require('mongoose');

const productValidator = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().optional(),
  images: Joi.array().items(Joi.string().uri()).required(),
  shoppingLinks: Joi.object({
    zepto: Joi.string().uri().allow('', null),
    instamart: Joi.string().uri().allow('', null),
    blinkit: Joi.string().uri().allow('', null),
  }).optional(),
  category: Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "ObjectId validation").required()
});

module.exports = productValidator;
