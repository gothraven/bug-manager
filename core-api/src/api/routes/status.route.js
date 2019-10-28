const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/status.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const { createStatus, updateStatus } = require('../validations/status.validation');

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

module.exports = router;
