import { Request, Response } from 'express';
import { Post } from '../../model';
const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find( {});
    res.json(posts);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
export default getAllPosts;
