import { Request, Response } from 'express';
import { User } from '../../model';
import bcrypt from 'bcrypt';

/**
 * @swagger
 * /api/resetPassword:
 *   post:
 *     summary: Reset user's password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User email and new password for password reset
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *               password:
 *                 type: string
 *                 description: New password for the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
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

const resetPassword = async (req: Request, res: Response) => {
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
export default resetPassword;
