const Joi = require('joi');

const bannerValidator = Joi.object({
  image: Joi.string().uri().required(),        // required string and must be a valid URI
  public_id: Joi.string().required(),          // required string
  title: Joi.string().optional(),               // optional string
  // no need for createdAt in validation
});

module.exports = bannerValidator;
