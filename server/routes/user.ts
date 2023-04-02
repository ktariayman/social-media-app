import express, { Request, Response, Router } from 'express';
import { register } from '../controllers/auth';
const router: Router = express.Router();
router.post('/register', register);

module.exports = router;
