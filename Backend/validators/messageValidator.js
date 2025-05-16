// validators/messageValidator.js
const Joi = require('joi');

const messageValidator = Joi.object({
  body: Joi.string().required(),
  imageUrl: Joi.string().uri().allow(null, ''), // optional or null
});

module.exports = messageValidator;
