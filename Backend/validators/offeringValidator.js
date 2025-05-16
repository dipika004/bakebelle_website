// validators/offeringValidator.js
const Joi = require('joi');

const offeringValidator = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).required()
});

module.exports = offeringValidator;
