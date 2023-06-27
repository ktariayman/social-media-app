import express, { Router } from 'express';
import {uploadImage} from '../controllers/post';
import { imageUpload ,isLogin} from '../middlewares';
const router: Router = express.Router();
router.post('/uploadImages', isLogin,imageUpload, uploadImage);

module.exports = router;
