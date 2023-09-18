import { Request, Response } from 'express';
import { Post } from '../../model';
/**
 * @swagger
 * /api/createPost:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     requestBody:
 *       description: Post data for creating a new post.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post.
 *               content:
 *                 type: string
 *                 description: Content of the post.
 *             required:
 *               - title
 *               - content
 *     responses:
 *       200:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the created post.
 *                 title:
 *                   type: string
 *                   description: Title of the post.
 *                 content:
 *                   type: string
 *                   description: Content of the post.
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
const createPost = async (req: Request, res: Response) => {
  try {

    const post = await new Post(req.body).save();
    await post.populate("user", "first_name last_name cover picture username")
    res.json(post);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
export default createPost;
