import express, { Router } from 'express';
import {
  register,
  activateAccount,
  login,
  sendVerification,
  findUserByEmail,
  sendResetPasswordCode,
  validateResetCode,
  changePassword,
  resetPassword
} from '../controllers/auth';
import { isLogin } from '../middlewares';
const router: Router = express.Router();

// need token
router.post('/activateAccount', isLogin, activateAccount);
router.post('/sendVerification', isLogin, sendVerification);
router.post('/changePassword', isLogin, changePassword);

// without token
router.post('/register', register);
router.post('/login', login);
router.post('/findUserByEmail', findUserByEmail);
router.post('/sendResetPasswordCode', sendResetPasswordCode);
router.post('/validateResetCode', validateResetCode);
router.post('/resetPassword', resetPassword);

module.exports = router;
