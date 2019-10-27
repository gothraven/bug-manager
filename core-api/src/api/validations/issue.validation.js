const Joi = require('joi');

module.exports = {
  body: {
    title: Joi.string(),
    content: Joi.string(),
    attachments: Joi.array().items(Joi.string()),
    creatorId: Joi.number(),
    assignedUserIds: Joi.number(),
    tagsIds: Joi.array().items(Joi.number()),
    projectId: Joi.number()
  },
  params: {
    issueId: Joi.string().required()
  }
};
