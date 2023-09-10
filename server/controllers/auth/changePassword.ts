import { Request, Response } from 'express';
import { User } from '../../model';
import bcrypt from 'bcrypt';
/**
 * @swagger
 * /api/changePassword:
 *   post:
 *     summary: Change user password
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User credentials for changing the password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *               oldPassword:
 *                 type: string
 *                 description: User's current (old) password.
 *               newPassword:
 *                 type: string
 *                 description: User's new password.
 *             required:
 *               - email
 *               - oldPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       401:
 *         description: Invalid old password.
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
