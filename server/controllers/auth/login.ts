import { Request, Response } from 'express';
import { User } from '../../model';
import bcrypt from 'bcrypt';
import { generateToken } from '../../helper';
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful. Returns user details and token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User's ID.
 *                 username:
 *                   type: string
 *                   description: User's username.
 *                 picture:
 *                   type: string
 *                   description: URL of user's profile picture.
 *                 first_name:
 *                   type: string
 *                   description: User's first name.
 *                 last_name:
 *                   type: string
 *                   description: User's last name.
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *                 verified:
 *                   type: boolean
 *                   description: Whether user's account is verified or not.
 *                 email:
 *                   type: string
 *                   description: User's email.
 *       400:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'the email address you entered is not connected to an account.'
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: 'Invalid credentials.Please try again.'
      });
    }
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      email: user.email
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
}
export default login;
