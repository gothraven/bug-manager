import Joi from 'joi';

module.exports = {
  // POST /comments
  createComment: {
    body: {
      issueId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
      content: Joi.string().required()
    }
  },
  // PATCH /comments/:commentId
  updateComment: {
    body: {
      content: Joi.string().required()
    },
    params: {
      commentId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
