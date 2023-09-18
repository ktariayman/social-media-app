import express, { Router } from 'express';
import { isLogin } from '../middlewares';
import { getReacts, reactPost } from '../controllers/react';
const router: Router = express.Router();
router.put("/reactPost", isLogin, reactPost);
router.get("/getReacts/:id", isLogin, getReacts);

module.exports = router;
