const Joi = require('joi');

module.exports = {
  // POST /auth/login
  login: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .max(128)
    }
  },

  // POST /auth/refresh
  refresh: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      refreshToken: Joi.string().required()
    }
  }
};
