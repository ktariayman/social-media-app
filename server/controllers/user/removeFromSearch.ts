

import { Request, Response } from "express";
import { User } from "../../model";
interface IRequest extends Request {
 user?: any;
}
const removeFromSearch = async (req: IRequest, res: Response) => {
 try {
  const { searchUser } = req.body;
  await User.updateOne(
   {
    _id: req.user.id,
   },
   { $pull: { search: { user: searchUser } } }
  );
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default removeFromSearch

