const Joi = require('joi');

const bannerValidator = Joi.object({
  image: Joi.string().required(),        // required string and must be a valid URI
  public_id: Joi.string().required(),          // required string              // optional string
  // no need for createdAt in validation
});

module.exports = bannerValidator;
