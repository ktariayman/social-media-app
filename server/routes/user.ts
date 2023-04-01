import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
router.get('/user', (req: Request, res: Response) => {
  res.send('welcome');
});
module.exports = router;
