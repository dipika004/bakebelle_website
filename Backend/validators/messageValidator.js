const Joi = require('joi');

const messageValidator = Joi.object({
  body: Joi.string().required(),
  imageUrl: Joi.string().uri().allow(null, ''), // optional, can be null or empty string
});

module.exports = messageValidator;
