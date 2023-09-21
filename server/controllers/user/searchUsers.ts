import { Request, Response } from "express";
import { User } from "../../model";
interface IRequest extends Request {
 params: any;
}
const searchUsers = async (req: IRequest, res: Response) => {
 try {
  const { searchTerm } = req.params;
  // const results = await User.find({ $text: { $search: searchTerm } }).select(
  //  "first_name last_name username picture"
  // );
  // console.log("log", results);

  // res.json(results);
  const regex = new RegExp(searchTerm, "i"); // "i" flag for case-insensitive search
  const results = await User.find({
   $or: [
    { first_name: { $regex: regex } },
    { last_name: { $regex: regex } },
    { username: { $regex: regex } },
    { email: searchTerm }
   ]
  }).select("first_name last_name username picture");
  console.log("log", results);

  res.json(results);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default searchUsers

