import { Request, Response } from "express";
import { User } from "../../model";
interface IRequest extends Request {
 user?: any;
}
const addToSearchHistory = async (req: IRequest, res: Response) => {

 try {
  const { searchUser } = req.body;
  const search = {
   user: searchUser,
   createdAt: new Date(),
  };
  const user = await User.findById(req.user.id);
  const check = user.search.find((x: any) => x.user.toString() === searchUser);
  if (check) {
   await User.updateOne(
    {
     _id: req.user.id,
     "search._id": check._id,
    },
    {
     $set: { "search.$.createdAt": new Date() },
    }
   );
  } else {
   await User.findByIdAndUpdate(req.user.id, {
    $push: {
     search,
    },
   });
  }
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
}
export default addToSearchHistory;