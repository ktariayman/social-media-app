


import { Request, Response } from "express";
import { User } from "../../model";
import mongoose from "mongoose";
interface IRequest extends Request {
 user?: any;
}
const getFriendsPageInfos = async (req: IRequest, res: Response) => {
 try {
  const user = await User.findById(req.user.id)
   .select("friends requests")
   .populate("friends", "first_name last_name picture username")
   .populate("requests", "first_name last_name picture username");
  const sentRequests = await User.find({
   requests: new mongoose.Types.ObjectId(req.user.id),
  }).select("first_name last_name picture username");
  res.json({
   friends: user.friends,
   requests: user.requests,
   sentRequests,
  });
 }
 catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default getFriendsPageInfos