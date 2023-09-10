import { User } from '../../model';
import { Request, Response } from 'express';
/**
 * @swagger
 * /api/findUserByEmail:
 *   post:
 *     summary: Find a user by email
 *     tags:
 *       - User
 *     requestBody:
 *       description: User email to search for
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email to search for.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: User found successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: User's email.
 *                 picture:
 *                   type: string
 *                   description: URL of user's profile picture.
 *       400:
 *         description: User account does not exist.
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
