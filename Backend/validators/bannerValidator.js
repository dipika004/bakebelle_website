const Joi = require('joi');

const bannerValidator = Joi.object({
  image: Joi.string().required(),
  public_id: Joi.string().required(),
  title: Joi.string().allow('').optional(),
  device: Joi.string().valid('large', 'small').optional()
});

module.exports = bannerValidator;
