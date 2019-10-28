const Joi = require('joi');

module.exports = {
  // POST /tags
  createTag: {
    body: {
      name: Joi.string().required(),
      description: Joi.string(),
      color: Joi.string()
        .regex(/^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/)
        .required()
    }
  },
  // PATCH /tags/:tagId
  updateTag: {
    body: {
      name: Joi.string(),
      description: Joi.string(),
      color: Joi.string()
        .regex(/^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/)
        .required()
    },
    params: {
      tagId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
