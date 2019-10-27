const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/user.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser
} = require('../validations/user.validation');

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
  .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)
  // todo make sure he can't update another profile
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
