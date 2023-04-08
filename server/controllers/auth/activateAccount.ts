import { Request, Response } from 'express';
import User from '../../model/user';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TOKEN_SECRET } from '../../config/config';
interface AuthenticatedRequest extends Request {
  user?: any;
}
async function activateAccount(req: AuthenticatedRequest, res: Response) {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, TOKEN_SECRET) as JwtPayload;
    const userExist = await User.findById(user.id);
    if (validUser !== user.id) {
      return res
        .status(400)
        .json({ message: "You don't have  the authorization to complete this operation " });
    }
    if (userExist?.verified == true) {
      return res.status(400).json({ message: 'This email is already activated.' });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res.status(200).json({ message: 'Account has beeen activated successfully.' });
    }
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    res.status(500).json({ message: errorMessage });
  }
}
export default activateAccount;
