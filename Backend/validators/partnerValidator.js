const Joi = require('joi');

const partnerRequestSchema = Joi.object({
  fullName: Joi.string().min(1).required().messages({
    'string.empty': 'Full Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be valid',
    'string.empty': 'Email is required'
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .allow('', null)
    .messages({
      'string.pattern.base': 'Phone number must be between 10 and 15 digits'
    }),
  companyName: Joi.string().min(1).required().messages({
    'string.empty': 'Company Name is required'
  }),
  partnershipType: Joi.string().required().messages({
    'string.empty': 'Partnership Type is required'
  }),
  message: Joi.string().min(10).required().messages({
    'string.min': 'Message should be at least 10 characters long',
    'string.empty': 'Message is required'
  }),
  website: Joi.string().uri().allow('', null).messages({
    'string.uri': 'Website must be a valid URL'
  }),
}).unknown(false);  // disallow unknown keys

function validatePartnerRequest(data) {
  return partnerRequestSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validatePartnerRequest,
};
