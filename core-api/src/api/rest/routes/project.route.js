import express from 'express';
import validate from 'express-validation';
import controller from '../controllers/project.controller';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';
import { listProjects, createProject, updateProject } from '../validations/project.validation';

const router = express.Router();

router.param('projectId', controller.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), validate(listProjects), controller.list)
  .post(authorize(ADMIN), validate(createProject), controller.create);

router
  .route('/:projectId')
  .get(authorize(LOGGED_USER), controller.get)
  .patch(authorize(ADMIN), validate(updateProject), controller.update)
  .delete(authorize(ADMIN), controller.remove);

export default router;
