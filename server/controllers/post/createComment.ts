import { Request, Response } from 'express';
import { Post } from '../../model';
interface IRequest extends Request {
 user?: any;
 params: any
}
const createComment = async (req: IRequest, res: Response) => {
 // try {

 //  const post = await new Post(req.body).save();
 //  res.json(post);
 // } catch (error) {
 //  const errorMessage: string = (error as Error).message;
 //  res.status(500).json({ message: errorMessage });
 // }

 try {
  const { comment, image, postId } = req.body;
  let newComments = await Post.findByIdAndUpdate(
   postId,
   {
    $push: {
     comments: {
      comment: comment,
      image: image,
      commentBy: req.user.id,
      commentAt: new Date(),
     },
    },
   },
   {
    new: true,
   }
  ).populate("comments.commentBy", "picture first_name last_name username");
  res.json(newComments.comments);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};


export default createComment;
