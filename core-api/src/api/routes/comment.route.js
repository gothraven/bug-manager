const express = require('express');
const validate = require('express-validation');
// const controller = require('../controllers/comment.controller');
const { authorize, LOGGED_USER } = require('../middlewares/auth');
const { body, params } = require('../validations/comment.validation');

const router = express.Router();

router
  .route('/')
  .get(authorize(LOGGED_USER), validate({}))
  .post(authorize(LOGGED_USER), validate({ body }));

router
  .route('/:commentId')
  .get(authorize(LOGGED_USER), validate({ params }))
  .put(authorize(LOGGED_USER), validate({ params, body }))
  .patch(authorize(LOGGED_USER), validate({ params }))
  .delete(authorize(LOGGED_USER), validate({ params }));
