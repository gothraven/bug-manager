import express from 'express';
import validate from 'express-validation';
import controller from '../controllers/tag.controller';
import { authorize, ADMIN, LOGGED_USER } from '../middlewares/auth';
import { listTags, createTag, updateTag } from '../validations/tag.validation';

const router = express.Router();

router.param('tagId', controller.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), validate(listTags), controller.list)
  .post(authorize(ADMIN), validate(createTag), controller.create);

router
  .route('/:tagId')
  .get(authorize(LOGGED_USER), controller.get)
  .patch(authorize(ADMIN), validate(updateTag), controller.update)
  .delete(authorize(ADMIN), controller.remove);

export default router;
