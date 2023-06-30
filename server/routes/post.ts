import express, { Router } from 'express';
import {archivePost, createPost,getAllPosts} from '../controllers/post';
import { isLogin } from '../middlewares';
const router: Router = express.Router();
router.post('/createPost', isLogin, createPost);
router.get('/getAllPosts', isLogin, getAllPosts);
router.put('/archivePost', isLogin, archivePost);

module.exports = router;
