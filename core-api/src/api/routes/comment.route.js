const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/comment.controller');
const { authorize, LOGGED_USER } = require('../middlewares/auth');
const { createComment, updateComment } = require('../validations/comment.validation');

const router = express.Router();

router.param('commentId', controller.load);

router.route('/').post(authorize(LOGGED_USER), validate(createComment), controller.create);

router
  .route('/:commentId')
  .patch(authorize(LOGGED_USER), validate(updateComment), controller.update)
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
