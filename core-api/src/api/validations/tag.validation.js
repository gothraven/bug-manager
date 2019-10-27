const Joi = require('joi');

module.exports = {
  body: {
    name: Joi.string(),
    description: Joi.string(),
    color: Joi.string()
  }
};
