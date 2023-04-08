import { Request, Response } from 'express';
import User from '../../model/user';
import Code from '../../model/code';
import { sendResetCode, generateCode } from '../../helper';

async function sendResetPasswordCode(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    await Code.findOneAndRemove({ user: user._id });
    const code: string = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: 'Email reset code has been sent to your email'
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
}
export default sendResetPasswordCode;
