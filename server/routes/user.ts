import express, { Router } from 'express';
import { register, activateAccount, login, sendVerification } from '../controllers/auth';
import isLogin from '../middlewares/isLogin';
const router: Router = express.Router();
router.post('/register', register);
router.post('/activateAccount', isLogin, activateAccount);
router.post('/sendVerification', isLogin, sendVerification);
router.post('/login', login);
module.exports = router;
