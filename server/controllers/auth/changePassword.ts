import { Request, Response } from 'express';
import User from '../../model/user';
import bcrypt from 'bcrypt';
const changePassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword
    }
  );
  return res.status(200).json({ message: 'ok' });
};
export default changePassword;