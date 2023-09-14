import { Request, Response } from "express";
import { User } from "../../model";
interface updatePpRequest extends Request {
 user?: any;
}
const updateProfilePicture = async (req: updatePpRequest, res: Response) => {
 try {
  const { url } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
   picture: url,
  });
  res.json(url);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default updateProfilePicture