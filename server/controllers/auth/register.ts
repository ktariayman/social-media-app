import { Request, Response } from 'express';
import { User } from '../../model';
import bcrypt from 'bcrypt';

import { validateEmail, validateLength, validateUsername, generateToken } from '../../helper';
import { sendVerificationEmail } from '../../helper';
async function register(req: Request, res: Response) {
  try {
    const { first_name, last_name, email, password, username, bYear, bMonth, bDay, gender } =
      req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'invalid email adress'
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: 'This email address already exists,try with a different email address'
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'first name must between 3 and 30 characters.'
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'last name must between 3 and 30 characters.'
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'password must be atleast 6 characters.'
      });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender
    }).save();

    const emailVerificationToken = generateToken({ id: user._id.toString() }, '30m');
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, '7d');

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      verified: user.verified,
      token: token,
      message: 'Register Success ! please activate your email to start'
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
}
export default register;
