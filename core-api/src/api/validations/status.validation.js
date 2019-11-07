const Joi = require('joi');

module.exports = {
  // POST /statuses
  createStatus: {
    body: {
      name: Joi.string().required(),
      description: Joi.string()
    }
  },
  // PATCH /statuses/:statusId
  updateStatus: {
    body: {
      name: Joi.string(),
      description: Joi.string()
    },
    params: {
      statusId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
