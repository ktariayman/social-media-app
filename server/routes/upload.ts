import express, { Router } from 'express';
import { uploadImage } from '../controllers/post';
import { imageUpload, isLogin } from '../middlewares';
import listImages from '../controllers/user/listImages';
const router: Router = express.Router();
router.post('/uploadImages', isLogin, imageUpload, uploadImage);
router.get('/listImages', isLogin, listImages);

module.exports = router;
