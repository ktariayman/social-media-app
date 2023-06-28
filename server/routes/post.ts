import express, { Router } from 'express';
import {createPost,getAllPosts} from '../controllers/post';
import { isLogin } from '../middlewares';
const router: Router = express.Router();
router.post('/createPost', isLogin, createPost);
router.get('/getAllPosts', isLogin, getAllPosts);

module.exports = router;
