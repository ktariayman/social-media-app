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
import isLogin from '../middlewares/isLogin';
const router: Router = express.Router();
router.post('/register', register);
router.post('/activateAccount', isLogin, activateAccount);
router.post('/sendVerification', isLogin, sendVerification);
router.post('/login', login);
router.post('/findUserByEmail', findUserByEmail);
router.post('/sendResetPasswordCode', sendResetPasswordCode);
router.post('/validateResetCode', validateResetCode);
router.post('/changePassword', isLogin, changePassword);
router.post('/resetPassword', resetPassword);

module.exports = router;
