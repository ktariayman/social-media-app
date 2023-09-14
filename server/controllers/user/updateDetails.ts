import { Request, Response } from "express";
import { User } from "../../model";
interface updateDetailsRequest extends Request {
 user?: any;
}
const updateDetails = async (req: updateDetailsRequest, res: Response) => {
 try {
  const { infos } = req.body;

  const updated = await User.findByIdAndUpdate(
   req.user.id,
   {
    details: infos,
   },
   {
    new: true,
   }
  );
  res.json(updated.details);
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default updateDetails