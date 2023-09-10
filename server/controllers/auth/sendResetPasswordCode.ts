import { Request, Response } from 'express';
import { User, Code } from '../../model';
import { sendResetCode, generateCode } from '../../helper';
/**
 * @swagger
 * /api/sendResetPasswordCode:
 *   post:
 *     summary: Send reset password code via email
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User email for sending a reset password code
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email for sending the reset password code.
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Reset password code sent successfully.
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

async function sendResetPasswordCode(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    await Code.findOneAndRemove({ user: user._id });
    const code: string = generateCode(5);
    const savedCode = await new Code({
      code,
      user: user._id
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: 'Email reset code has been sent to your email'
    });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
}
export default sendResetPasswordCode;
