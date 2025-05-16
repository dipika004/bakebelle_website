// validators/videoValidator.js
const Joi = require('joi');

const videoValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  videoUrl: Joi.string().uri().required(),
});

module.exports = videoValidator;
