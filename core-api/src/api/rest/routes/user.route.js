import express from 'express';
import validate from 'express-validation';
import controller from '../controllers/user.controller';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';
import { listUsers, createUser, updateUser } from '../validations/user.validation';

const router = express.Router();

router.param('userId', controller.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), validate(listUsers), controller.list)
  .post(authorize(ADMIN), validate(createUser), controller.create);

router.route('/self').get(authorize(), controller.loggedIn);

router
  .route('/:userId')
  .get(authorize(LOGGED_USER), controller.get)
  // todo make sure he can't update another profile
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
  .delete(authorize(ADMIN), controller.remove);

export default router;
