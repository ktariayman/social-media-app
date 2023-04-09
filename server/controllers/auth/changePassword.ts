import { Request, Response } from 'express';
import { User } from '../../model';
import bcrypt from 'bcrypt';

const changePassword = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email }).select('+password');
  const passwordMatches = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid old password' });
  }
  const cryptedPassword = await bcrypt.hash(newPassword, 12);
  await User.findOneAndUpdate(
    { email },
    {
      password: cryptedPassword
    }
  );
  return res.status(200).json({ message: 'Password updated successfully' });
};

export default changePassword;
