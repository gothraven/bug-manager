import express from 'express';
import validate from 'express-validation';
import controller from '../controllers/auth.controller';
import { signup, signin, refresh } from '../validations/auth.validation';

const router = express.Router();

router.route('/signup').post(validate(signup), controller.signup);

router.route('/signin').post(validate(signin), controller.signin);

router.route('/refresh-token').post(validate(refresh), controller.refresh);

/**
 * TODO: POST /v1/auth/reset-password
 */

export default router;
