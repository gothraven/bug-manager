const Joi = require('joi');

module.exports = {
  body: {
    userId: Joi.number(),
    issueId: Joi.number(),
    contentId: Joi.string()
  },
  params: {
    commentId: Joi.string().require()
  }
};
