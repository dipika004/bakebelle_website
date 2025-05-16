// validators/bannerValidator.js
const Joi = require('joi');

const bannerValidator = Joi.object({
  image: Joi.string().uri().required(),
  title: Joi.string().optional(),
});

module.exports = bannerValidator;
