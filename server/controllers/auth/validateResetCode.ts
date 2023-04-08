import { Request, Response } from 'express';
import User from '../../model/user';
import Code from '../../model/code';
async function validateResetCode(req: Request, res: Response) {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: 'Verification code is wrong..'
      });
    }
    console.log('Dbcode.code !== code', Dbcode.code !== code);
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
}
export default validateResetCode;
