const Joi = require('joi');

// Validator for /subscribe route (only email)
const subscribeValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

// Validator for /verify route (email + code)
const verifyValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).pattern(/^\d{6}$/).required(), // exactly 6 digits
  });
  return schema.validate(data);
};

module.exports = { subscribeValidator, verifyValidator };
