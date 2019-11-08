import express from 'express';
import validate from 'express-validation';
import controller from '../controllers/status.controller';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';
import { createStatus, updateStatus } from '../validations/status.validation';

const router = express.Router();

router.param('statusId', controller.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), controller.list)
  .post(authorize(ADMIN), validate(createStatus), controller.create);

router
  .route('/:statusId')
  .get(authorize(LOGGED_USER), controller.get)
  .patch(authorize(ADMIN), validate(updateStatus), controller.update)
  .delete(authorize(ADMIN), controller.remove);

export default router;
