const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/project.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const { listProjects, createProject } = require('../validations/project.validation');

const router = express.Router();

router.param('projectId', controller.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), validate(listProjects), controller.list)
  .post(authorize(ADMIN), validate(createProject), controller.create);

router.route('/:projectId').get(authorize(LOGGED_USER), controller.get);
// .put(authorize(ADMIN), validate({ params, body }))
// .patch(authorize(ADMIN), validate({ params }))
// .delete(authorize(ADMIN), validate({ params }));
