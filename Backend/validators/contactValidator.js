// validators/contactValidator.js
const Joi = require('joi');

const contactSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Full Name is required.',
    'string.min': 'Full Name should be at least 3 characters.'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Please provide a valid email address.'
  }),
  phone: Joi.string()
    .pattern(/^[0-9+\s()-]*$/)
    .allow('')
    .messages({
      'string.pattern.base': 'Phone number format is invalid.'
    }),
  subject: Joi.string().valid('General Inquiry', 'Product Feedback', 'Support / Help').required().messages({
    'any.only': 'Invalid subject selected.',
    'string.empty': 'Subject is required.'
  }),
  message: Joi.string().min(10).max(1000).required().messages({
    'string.empty': 'Message is required.',
    'string.min': 'Message should be at least 10 characters long.'
  })
});

module.exports = contactSchema;
