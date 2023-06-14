import express, { Router } from 'express';
import {createPost} from '../controllers/post';
import { isLogin } from '../middlewares';
const router: Router = express.Router();
router.post('/createPost', isLogin, createPost);

module.exports = router;
