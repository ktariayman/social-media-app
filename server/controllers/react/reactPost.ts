import { Request, Response } from "express";

import React from "../../model/react";
import mongoose from "mongoose";
interface IRequest extends Request {
 user?: any;
 params: any
}
const reactPost = async (req: IRequest, res: Response) => {
 try {
  const { postId, react } = req.body;
  console.log("postId", postId);
  console.log("react", react);
  const check = await React.findOne({
   postRef: postId,
   reactBy: req.user.id,
  });
  console.log("check", check);

  if (check == null) {
   const newReact = new React({
    react: react,
    postRef: postId,
    reactBy: req.user.id,
   });
   await newReact.save();
   console.log("newReact", newReact);

  } else {
   if (check.react == react) {
    await React.findByIdAndRemove(check._id);
    console.log("check2", check);

   } else {
    await React.findByIdAndUpdate(check._id, {
     react: react,
    });
    console.log("check3", check);

   }
  }
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};

export default reactPost

