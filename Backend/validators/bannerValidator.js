const Joi = require('joi');

const bannerValidator = Joi.object({
  image: Joi.string().required(),
  public_id: Joi.string().required(),
});

module.exports = bannerValidator;
