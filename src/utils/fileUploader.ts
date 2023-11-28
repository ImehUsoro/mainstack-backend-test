import { Request } from "express";
import cloudinary from "../config/cloudinaryConfig";
import { upload } from "../middleware/imageUploadMiddleWare";

export const uploadSingle = upload.single("image");

export const uploadToCloudinary = async (req: Request) => {
  const folderPath = process.env.CLOUDINARY_FOLDER_PATH!;
  const publicId = folderPath + Date.now();

  return await cloudinary.uploader.upload(req.file!.path, {
    public_id: publicId,
  });
};
