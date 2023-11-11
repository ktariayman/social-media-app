import { Request, Response } from "express";
import { User } from "../../model";
interface updatePpRequest extends Request {
 user?: any;
}
const updateProfileCover = async (req: updatePpRequest, res: Response) => {
 try {
  const { url } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, {
   cover: url,
  });
  res.json(url);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default updateProfileCover