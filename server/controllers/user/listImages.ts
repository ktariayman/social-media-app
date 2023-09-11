import { Request, Response } from "express";
const cloudinary = require("cloudinary")
const listImages = async (req: Request, res: Response) => {
  const { path, sort, max } = req.body;
  cloudinary.v2.search
    .expression(`${path}`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result: any) => {
      res.json(result);
    })
    .catch((error: any) => {
      const errorMessage: string = (error as Error).message;
      res.status(500).json({ message: errorMessage });
    })
};

export default listImages