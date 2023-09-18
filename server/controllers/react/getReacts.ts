import { Request, Response } from "express";

import React from "../../model/react";
import User from "../../model/user";

import mongoose from "mongoose";
interface IRequest extends Request {
 user?: any;
 params: any
}

const getReacts = async (req: IRequest, res: Response) => {
 try {
  const reactsArray = await React.find({ postRef: req.params.id });
  const newReacts = reactsArray.reduce((group: any, react: any) => {
   let key = react["react"];
   group[key] = group[key] || [];
   group[key].push(react);
   return group;
  }, {});

  const reacts = [
   {
    react: "like",
    count: newReacts.like ? newReacts.like.length : 0,
   },
   {
    react: "love",
    count: newReacts.love ? newReacts.love.length : 0,
   },
   {
    react: "haha",
    count: newReacts.haha ? newReacts.haha.length : 0,
   },
   {
    react: "sad",
    count: newReacts.sad ? newReacts.sad.length : 0,
   },
   {
    react: "wow",
    count: newReacts.wow ? newReacts.wow.length : 0,
   },
   {
    react: "angry",
    count: newReacts.angry ? newReacts.angry.length : 0,
   },
  ];

  const check = await React.findOne({
   postRef: req.params.id,
   reactBy: req.user.id,
  });
  const user = await User.findById(req.user.id);
  const checkSaved = user?.savedPosts.find(
   (x: any) => x.post.toString() === req.params.id
  );
  res.json({
   reacts,
   check: check?.react,
   total: reactsArray.length,
   checkSaved: checkSaved ? true : false,
  });
 } catch (error) {
  const errorMessage: string = (error as Error).message;
  res.status(500).json({ message: errorMessage });
 }
};
export default getReacts