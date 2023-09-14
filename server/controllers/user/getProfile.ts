import { Request, Response } from "express";
import { Post, User } from "../../model";

const getProfile = async (req: Request, res: Response) => {
 try {
  const { username } = req.params;
  const profile = await User.findOne({ username }).select('-password');
  if (!profile) {
   return res.json({ ok: false })
  }
  const posts = await Post.find({ user: profile._id })
   .populate("user")
   .sort({ createdAt: -1 });
  await profile.populate("friends", "first_name last_name username picture");
  res.json({ ...profile.toObject(), posts });

 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};
export default getProfile;