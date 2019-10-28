const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/tag.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const { createTag, updateTag } = require('../validations/tag.validation');

const router = express.Router();

router.param('tagId', controller.load);

router
  .route('/')
  .get(authorize(LOGGED_USER), controller.list)
  .post(authorize(ADMIN), validate(createTag), controller.create);

router
  .route('/:tagId')
  .get(authorize(LOGGED_USER), controller.get)
  .patch(authorize(ADMIN), validate(updateTag), controller.update)
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
