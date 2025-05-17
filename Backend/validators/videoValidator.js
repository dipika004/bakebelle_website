const Joi = require('joi');

// For POST (create video)
const createVideoValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
});

// For PUT (update video)
const updateVideoValidator = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().allow('', null).optional(),
});

module.exports = { createVideoValidator, updateVideoValidator };
