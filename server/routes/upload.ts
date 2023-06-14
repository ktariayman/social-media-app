import express, { Router } from 'express';
import {uploadImage} from '../controllers/post';
import { imageUpload } from '../middlewares';
const router: Router = express.Router();
router.post('/uploadImages', imageUpload, uploadImage);

module.exports = router;
