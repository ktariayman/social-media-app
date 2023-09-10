import { Request, Response } from 'express';
import { Post } from '../../model';
const cloudinary = require("cloudinary");
import fs from "fs";
import path from "path";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     summary: Upload image(s) to Cloudinary
 *     tags:
 *       - Images
 *     requestBody:
 *       description: Image(s) to upload.
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: Destination path for uploaded image(s).
 *               file:
 *                 type: array
 *                 items:
 *                   type: string
 *                 format: binary
 *                 description: The image file(s) to upload.
 *             required:
 *               - path
 *               - file
 *     responses:
 *       200:
 *         description: Image(s) uploaded successfully to Cloudinary.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     description: URL of the uploaded image.
 *       400:
 *         description: No file selected for upload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error during image upload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 */
const uploadImage = async (req: Request, res: Response) => {
  try {
    const { path } = req.body;
    if (!req.files) return res.status(400).json({ message: "no file selected" })
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    const errorMessage: string = (error as Error).message;

    return res.status(500).json({ message: errorMessage });
  }
};
export default uploadImage;


const uploadToCloudinary = async (file: any, path: string): Promise<any> => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err: any, res: any) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path: string): void => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
