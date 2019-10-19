const Joi = require('joi');

module.exports = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required()
  },
  params: {
    projectId: Joi.string().required()
  }
};
