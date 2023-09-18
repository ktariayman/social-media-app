import { Request, Response } from 'express';
import { Post } from '../../model';
/**
 * @swagger
 * /api/archivePost:
 *   put:
 *     summary: Archive or unarchive a post
 *     tags:
 *       - Posts
 *     requestBody:
 *       description: Post ID and archive status for updating the post.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the post to archive/unarchive.
 *               isArchived:
 *                 type: boolean
 *                 description: New archive status for the post (true for archive, false for unarchive).
 *             required:
 *               - id
 *               - isArchived
 *     responses:
 *       200:
 *         description: Post archive status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID of the updated post.
 *                 title:
 *                   type: string
 *                   description: Title of the post.
 *                 content:
 *                   type: string
 *                   description: Content of the post.
 *                 isArchived:
 *                   type: boolean
 *                   description: Updated archive status of the post.
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

const archivePost = async (req: Request, res: Response) => {
  try {
    const { id, isArchived } = req.body;
    // await Post.findByIdAndUpdate(id, {
    //   isArchived: !isArchived,
    // }, { new: true });

    const post = await Post.findOne({ _id: id }).exec()
    console.log("isArchived", post);
    post.isArchived = isArchived
    await post.save()

    res.json({ status: 'ok' });
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export default archivePost;