

import { Request, Response } from "express";
import { User } from "../../model";
interface IRequest extends Request {
 user?: any;
}
const getSearchHistory = async (req: IRequest, res: Response) => {
 try {
  const results = await User.findById(req.user.id)
   .select("search")
   .populate("search.user", "first_name last_name username picture");
  res.json(results.search);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default getSearchHistory

