const Joi = require('joi');

module.exports = {
  // GET /projects
  listProjects: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.string(),
      description: Joi.string()
    }
  },

  // POST /projects
  createProject: {
    body: {
      name: Joi.string().required(),
      description: Joi.string()
    }
  },

  // PATCH /project/:projectId
  updateProject: {
    body: {
      email: Joi.string(),
      description: Joi.string()
    },
    params: {
      projectId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
