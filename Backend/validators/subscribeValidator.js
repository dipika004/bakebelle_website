// validators/subscribeValidator.js
const Joi = require('joi');

const subscribeValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

const verifyValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().length(6).pattern(/^\d{6}$/).required(),
  });
  return schema.validate(data);
};

module.exports = { subscribeValidator, verifyValidator };
