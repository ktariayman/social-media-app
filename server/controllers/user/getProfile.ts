import { Request, Response } from "express";
import { Post, User } from "../../model";
interface IRequest extends Request {
 user?: any;
}
const getProfile = async (req: IRequest, res: Response) => {
 try {
  const user = await User.findById(req.user.id);
  const { username } = req.params;
  const profile = await User.findOne({ username }).select('-password');
  if (!profile) {
   return res.json({ ok: false })
  }
  const friendship = {
   friends: false,
   following: false,
   requestSent: false,
   requestReceived: false,
  };
  if (user.friends.includes(profile._id) && profile.friends.includes(user._id)) {
   friendship.friends = true;
  }
  if (user.following.includes(profile._id)) {
   friendship.following = true;
  }
  if (user.requests.includes(profile._id)) {
   friendship.requestReceived = true;
  }
  if (profile.requests.includes(user._id)) {
   friendship.requestSent = true;
  }
  const posts = await Post.find({ user: profile._id })
   .populate("user")
   .populate(
    "comments.commentBy",
    "first_name last_name picture username commentAt"
   )
   .sort({ createdAt: -1 });
  await profile.populate("friends", "first_name last_name username picture");
  res.json({ ...profile.toObject(), posts, friendship });
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};
export default getProfile;