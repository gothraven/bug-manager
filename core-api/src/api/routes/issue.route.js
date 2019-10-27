const express = require('express');
const validate = require('express-validation');
// const controller = require('../controllers/project.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const { body, params } = require('../validations/issue.validation');

const router = express.Router();

router
  .route('/')
  .get(authorize(LOGGED_USER), validate({}))
  .post(authorize(ADMIN), validate({ body }));

router
  .route('/:issueId')
  .get(authorize(LOGGED_USER), validate({ params }))
  .put(authorize(ADMIN), validate({ params, body }))
  .patch(authorize(ADMIN), validate({ params }))
  .delete(authorize(ADMIN), validate({ params }));

router.route('/findByTags').post(authorize(LOGGED_USER), validate({}));

router.route('/findByStatus').post(authorize(LOGGED_USER), validate({}));
