import express from 'express';
import validate from 'express-validation';
import controller from '../controllers/comment.controller';
import { authorize, LOGGED_USER } from '../middlewares/auth';
import { createComment, updateComment } from '../validations/comment.validation';

const router = express.Router();

router.param('commentId', controller.load);

router.route('/').post(authorize(LOGGED_USER), validate(createComment), controller.create);

router
  .route('/:commentId')
  .patch(authorize(LOGGED_USER), validate(updateComment), controller.update)
  .delete(authorize(LOGGED_USER), controller.remove);

export default router;
