const Joi = require('joi');

const offeringSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = (data) => offeringSchema.validate(data);
