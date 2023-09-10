import { Request, Response } from 'express';
import { Post } from '../../model';
/**
 * @swagger
 * /api/getAllPosts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Successfully retrieved all posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the post.
 *                   title:
 *                     type: string
 *                     description: Title of the post.
 *                   content:
 *                     type: string
 *                     description: Content of the post.
 *                   user:
 *                     type: object
 *                     properties:
 *                       first_name:
 *                         type: string
 *                         description: User's first name.
 *                       last_name:
 *                         type: string
 *                         description: User's last name.
 *                       picture:
 *                         type: string
 *                         description: URL of user's profile picture.
 *                       username:
 *                         type: string
 *                         description: User's username.
 *                       gender:
 *                         type: string
 *                         description: User's gender.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Date and time of post creation.
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
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("user", "first_name last_name picture username gender")
      .sort({ createdAt: -1 })
    res.json(posts);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
export default getAllPosts;


