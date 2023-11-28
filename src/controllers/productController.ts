import { Request, Response } from "express";
import cloudinary from "../config/cloudinaryConfig";
import Product from "../models/Product";
import { matchedData } from "express-validator";

export const createProduct = async (req: Request, res: Response) => {
  const { specifications, image, ...data } = matchedData(req);

  try {
    if (!req.file) {
      res.status(400).send("No file uploaded");
      return;
    }

    const matchQuery = { $or: [{ name: data.name }] };

    const existingProduct = await Product.findOne(matchQuery);

    if (existingProduct) {
      res.status(400).json({ error: "This Product already exists" });
      return;
    }

    const folderPath = "mainstack/";

    const publicId = folderPath + Date.now();

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: publicId,
    });

    const parsedSpecifications = JSON.parse(specifications);

    const userData = {
      ...data,
      specifications: parsedSpecifications,
      image_url: result.secure_url,
    };

    const product = await Product.create(userData);
    const sendProduct = await product.populate({
      path: "category",
      select: "_id name",
    });

    res.status(201).send(sendProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
