import express, { Router } from 'express';
import { uploadImage } from '../controllers/post';
import { imageUpload, isLogin } from '../middlewares';
import { listImages } from '../controllers/user';
const router: Router = express.Router();
router.post('/uploadImages', isLogin, imageUpload, uploadImage);
router.post('/listImages', isLogin, listImages);

module.exports = router;
