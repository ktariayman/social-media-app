import { Request, Response } from "express";
import { User } from "../../model";

const getProfile = async (req: Request, res: Response) => {
 try {
  const { username } = req.params;
  const profile = await User.findOne({ username }).select('-password');
  if (!profile) {
   return res.json({ ok: false })
  }
  return res.status(200).json(profile);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};
export default getProfile;