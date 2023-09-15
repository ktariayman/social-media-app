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
  resetPassword,
} from '../controllers/auth';
import { getProfile, updateProfilePicture } from '../controllers/user'
import { isLogin } from '../middlewares';
import updateDetails from '../controllers/user/updateDetails';
import updateProfileCover from '../controllers/user/updateProfileCover';
import { acceptRequest, addFriend, cancelRequest, deleteRequest, follow, unfollow, unfriend } from '../controllers/user/friendInvitationSystem';
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

// Profile 
router.get('/getProfile/:username', isLogin, getProfile);
router.put("/updateProfilePicture", isLogin, updateProfilePicture);
router.put("/updateProfileCover", isLogin, updateProfileCover);
router.put("/updateDetails", isLogin, updateDetails);


// friend invitation system 
router.put("/addFriend/:id", isLogin, addFriend);
router.put("/cancelRequest/:id", isLogin, cancelRequest);
router.put("/follow/:id", isLogin, follow);
router.put("/unfollow/:id", isLogin, unfollow);
router.put("/acceptRequest/:id", isLogin, acceptRequest);
router.put("/deleteRequest/:id", isLogin, deleteRequest);
router.put("/unfriend/:id", isLogin, unfriend);


module.exports = router;
