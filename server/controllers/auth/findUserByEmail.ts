import User from '../../model/user';
import { Request, Response } from 'express';
const findUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: 'Account does not exists.'
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
export default findUserByEmail;
