const express = require('express');
const validate = require('express-validation');
// const controller = require('../controllers/project.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const { body } = require('../validations/tag.validation');

const router = express.Router();

router
  .route('/')
  .get(authorize(LOGGED_USER), validate({}))
  .post(authorize(ADMIN), validate({ body }));
