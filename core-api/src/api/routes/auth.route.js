const express = require('express');
const validate = require('express-validation');
const controller = require('../controllers/auth.controller');
const { signup, signin, refresh } = require('../validations/auth.validation');

const router = express.Router();

router.route('/signup').post(validate(signup), controller.signup);

router.route('/signin').post(validate(signin), controller.signin);

router.route('/refresh-token').post(validate(refresh), controller.refresh);

/**
 * TODO: POST /v1/auth/reset-password
 */

module.exports = router;
