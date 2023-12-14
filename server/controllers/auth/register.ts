import { Request, Response } from 'express';
import { User } from '../../model';
import bcrypt from 'bcrypt';
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 description: User's last name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               username:
 *                 type: string
 *                 description: User's username
 *               bYear:
 *                 type: string
 *                 description: User's birth year
 *               bMonth:
 *                 type: string
 *                 description: User's birth month
 *               bDay:
 *                 type: string
 *                 description: User's birth day
 *               gender:
 *                 type: string
 *                 description: User's gender
 *             example:
 *               first_name: John
 *               last_name: Doe
 *               email: john.doe@example.com
 *               password: password123
 *               username: johndoe
 *               bYear: 1990
 *               bMonth: 01
 *               bDay: 01
 *               gender: male
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User's ID
 *                 username:
 *                   type: string
 *                   description: User's username
 *                 picture:
 *                   type: string
 *                   description: User's profile picture
 *                 first_name:
 *                   type: string
 *                   description: User's first name
 *                 last_name:
 *                   type: string
 *                   description: User's last name
 *                 verified:
 *                   type: boolean
 *                   description: Whether the user's email is verified or not
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

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

    // const emailVerificationToken = generateToken({ id: user._id.toString() }, '30m');
    // const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    // sendVerificationEmail(user.email, user.first_name, url);
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
