const Joi = require('joi');

module.exports = {
  // GET /projects
  listProjects: {
    query: {
      page: Joi.number()
        .min(1)
        .required(),
      perPage: Joi.number()
        .min(1)
        .max(100)
        .required(),
      title: Joi.string().required(),
      description: Joi.string().required()
    }
  },

  // POST /projects
  createUser: {
    body: {
      title: Joi.string().required(),
      description: Joi.string()
    }
  }
};
