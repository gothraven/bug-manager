const Joi = require('joi');

module.exports = {
  // GET /tags
  listTags: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      description: Joi.string(),
      color: Joi.string().regex(/^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/)
    }
  },
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
      color: Joi.string().regex(/^#((0x){0,1}|#{0,1})([0-9A-F]{8}|[0-9A-F]{6})$/)
    },
    params: {
      tagId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
