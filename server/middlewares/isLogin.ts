import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');
interface AuthenticatedRequest extends Request {
  user?: any;
}
const isLogin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let tmp = req.header('Authorization');

    const token = tmp ? tmp.slice(7, tmp.length) : '';
    if (!token) {
      return res.status(400).json({ message: 'Invalid Authentification' });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err: Error, user: any) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid Authentification' });
      }
      req.user = user;
      next();
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default isLogin;
