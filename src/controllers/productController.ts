import { NextFunction, Request, Response } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig";
import Product from "../models/Product";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const singleUpload = upload.single("image");

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    // if (!req.body.specifications) {
    //   res.status(400).send("Specifications not provided");
    //   return;
    // }

    const specifications = JSON.parse(req.body.specifications);

    const result = await cloudinary.uploader.upload(req.file.path);

    const product = new Product({
      ...req.body,
      specifications,
      image_url: result.secure_url,
    });

    await product.save();

    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const singleUploadMiddleware = (
  req: Request & { file: File },
  res: Response,
  next: NextFunction
) => {
  singleUpload(req, res, (err: any) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "File upload error", message: err.message });
    }
    next();
  });
};

export const createProductWithUpload = [singleUploadMiddleware, createProduct];

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
