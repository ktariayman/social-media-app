import { Request, Response } from 'express';
import { Post } from '../../model';
const createPost = async (req: Request, res: Response) => {
  try {
    const post = await new Post(req.body).save();
    res.json(post);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
export default createPost;
