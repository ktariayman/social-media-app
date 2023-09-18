import express, { Router } from 'express';
import { archivePost, createPost, getAllPosts, createComment, savePost, deletePost } from '../controllers/post';
import { isLogin } from '../middlewares';
const router: Router = express.Router();
router.post('/createPost', isLogin, createPost);
router.get('/getAllPosts', isLogin, getAllPosts);
router.put('/createComment', isLogin, createComment);
router.put("/savePost/:id", isLogin, savePost);
router.put('/archivePost', isLogin, archivePost);
router.delete("/deletePost/:id", isLogin, deletePost);

module.exports = router;
