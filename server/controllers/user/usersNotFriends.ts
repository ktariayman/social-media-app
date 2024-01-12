import { Request, Response } from "express";
import { User } from "../../model";

interface IRequest extends Request {
  user?: any;
}

const usersNotFriends = async (req: IRequest, res: Response) => {
  try {

    // this api to return the users that I'm not friend with, I havent'
    const loggedInUserId = req.user.id;
    const query = {
      _id: { $ne: loggedInUserId },
      friends: { $not: { $in: [loggedInUserId] } },
      $and: [
        { requests: { $ne: loggedInUserId } },
        { requests: { $not: { $in: [loggedInUserId] } } },
      ],
    }
    const usersNotFriends =
      await User.find(query)
        .select('first_name last_name username picture requests')
        .limit(5);
    res.status(200).json(usersNotFriends);
  } catch (error) {
    const errorMessage: string = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export default usersNotFriends;