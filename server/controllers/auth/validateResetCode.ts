import { Request, Response } from 'express';
import { User, Code } from '../../model';
/**
 * @swagger
 * /api/validateResetCode:
 *   post:
 *     summary: Validate reset password code
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User email and reset code for code validation
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email.
 *               code:
 *                 type: string
 *                 description: Reset code to validate.
 *             required:
 *               - email
 *               - code
 *     responses:
 *       200:
 *         description: Code validation successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *       400:
 *         description: Verification code is wrong.
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
async function validateResetCode(req: Request, res: Response) {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const Dbcode = await Code.findOne({ user: user._id });
    if (Dbcode.code !== code) {
      return res.status(400).json({
        message: 'Verification code is wrong..'
      });
    }
    console.log('Dbcode.code !== code', Dbcode.code !== code);
    return res.status(200).json({ message: 'ok' });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
}
export default validateResetCode;
