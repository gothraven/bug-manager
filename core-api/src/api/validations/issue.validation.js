const Joi = require('joi');

module.exports = {
  // GET /issues
  listIssue: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      description: Joi.string()
    }
  },
  // POST /issues
  createIssue: {
    body: {
      title: Joi.string().required(),
      content: Joi.string(),
      statusId: Joi.string(),
      open: Joi.bool(),
      assignedUserIds: Joi.array().items(Joi.number()),
      tagsIds: Joi.array().items(Joi.number()),
      projectId: Joi.array().items(Joi.number())
    }
  },
  // PATCH /projects/:issueId
  updateIssue: {
    body: {
      title: Joi.string(),
      content: Joi.string(),
      statusId: Joi.string(),
      open: Joi.bool(),
      assignedUserIds: Joi.array().items(Joi.number()),
      tagsIds: Joi.array().items(Joi.number()),
      projectId: Joi.array().items(Joi.number())
    },
    params: {
      projectId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },
  issue: {
    params: {
      projectId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
