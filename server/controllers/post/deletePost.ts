import { Request, Response } from 'express';
import { Post } from '../../model';

const deletePost = async (req: Request, res: Response) => {
 try {
  await Post.findByIdAndRemove(req.params.id);
  res.json({ status: "ok" });
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default deletePost;