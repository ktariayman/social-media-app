import { Request, Response } from 'express';
import { Post } from '../../model';

const archivePost = async (req: Request, res: Response) => {
  try {
    const { id, isArchived } = req.body;
  console.log("req.body",req.body)
    
    const updatedPost = await Post.findByIdAndUpdate(id, {
      isArchived: !isArchived,
    }, { new: true });

    res.json(updatedPost);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export default archivePost;