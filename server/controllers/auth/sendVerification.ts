import { Request, Response } from 'express';
import { generateToken } from '../../helper';
import { User } from '../../model';
import { sendVerificationEmail } from '../../helper';
/**
 * @swagger
 * /api/sendVerification:
 *   post:
 *     summary: Send email verification link
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Email verification link sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Account is already activated.
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

interface AuthenticatedRequest extends Request {
  user?: any;
}
const sendVerification = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user?.verified === true) {
      return res.status(400).json({
        message: 'This account is already activated.'
      });
    }
    const emailVerificationToken = generateToken({ id: user?._id.toString() }, '30m');
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    if (user?.email) sendVerificationEmail(user?.email, user?.first_name, url);
    return res.status(200).json({
      message: 'Email verification link has been sent to your email.'
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export default sendVerification;
