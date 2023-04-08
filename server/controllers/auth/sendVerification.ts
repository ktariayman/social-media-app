import { Request, Response } from 'express';
import { generateToken } from '../../helper';
import User from '../../model/user';
import { sendVerificationEmail } from '../../helper';
interface AuthenticatedRequest extends Request {
  user?: any;
}
const sendVerification = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user?.verified === true) {
      return res.status(400).json({
        message: 'This account is already activated.'
      });
    }
    const emailVerificationToken = generateToken({ id: user?._id.toString() }, '30m');
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    if (user?.email) sendVerificationEmail(user?.email, user?.first_name, url);
    return res.status(200).json({
      message: 'Email verification link has been sent to your email.'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export default sendVerification;
