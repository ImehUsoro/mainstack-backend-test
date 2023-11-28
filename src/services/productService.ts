import { Request, Response } from "express";
import { CreateProductDto } from "../dtos/products";
import Product from "../models/Product";
import { uploadToCloudinary } from "../utils/fileUploader";
import { findCategoryBySearchedNameService } from "./categoryService";
import { get } from "mongoose";

export const createProductService = async (
  req: Request,
  res: Response,
  data: CreateProductDto
) => {
  try {
    const { specifications, name, ...rest } = data;

    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const existingProduct = await findProductByNameService(name);

    if (existingProduct) {
      return res.status(400).json({
        status: "error",
        error: "This product already exists",
      });
    }

    const { secure_url } = await uploadToCloudinary(req);
    const product = await Product.create({
      name,
      specifications: JSON.parse(specifications),
      image_url: secure_url,
      ...rest,
    });

    return res.status(201).json({
      status: "success",
      message: "Successfully created a new Product",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
};

export const findProductByNameService = async (productName: string) => {
  const product = await Product.findOne({ name: productName });

  if (!product) {
    return null;
  }

  return product;
};

export const getAllProductsService = async (res: Response) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      status: "success",
      message: "Successfully retrieved all Products",
      products,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", error: "Internal Server Error" });
  }
};

export const getProductByIdService = async (productId: string) => {
  const product = await Product.findById(productId);

  if (!product) {
    return null;
  }

  return product;
};

export const getProductByIdAndRespondService = async (
  productId: string,
  res: Response
) => {
  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", error: "Product not found" });
  }

  return res.status(200).json({
    status: "success",
    message: "Successfully retrieved a Product",
    product,
  });
};

export const searchProductService = async (
  name: string,
  res: Response,
  page: number = 1,
  pageSize: number = 10,
  category?: string
) => {
  const query: any = {};

  if (name) {
    query.name = { $regex: new RegExp(name, "i") };
  }

  if (category) {
    const foundCategory = await findCategoryBySearchedNameService(category);
    if (foundCategory) {
      query.category = foundCategory._id;
    }
  }

  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    Product.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
    Product.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  const currentPage = page > totalPages ? totalPages : page;

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved all Products",
    data: { products, total, currentPage, pageSize, totalPages },
  });
};

export const getProductsByCategoryService = async (
  category: string,
  res: Response,
  page: number = 1,
  pageSize: number = 10
) => {
  const foundCategory = await findCategoryBySearchedNameService(category);

  if (!foundCategory) {
    return res
      .status(404)
      .json({ status: "error", error: "Category not found" });
  }

  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    Product.find({ category: foundCategory._id })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }),
    Product.countDocuments({ category: foundCategory._id }),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  const currentPage = page > totalPages ? totalPages : page;

  res.status(200).json({
    status: "success",
    message: "Successfully retrieved all Products",
    data: { products, total, currentPage, pageSize, totalPages },
  });
};

export const deleteProductService = async (
  productId: string,
  res: Response
) => {
  const product = await getProductByIdService(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", error: "Product not found" });
  }

  await Product.deleteOne({ _id: productId });

  return res.status(200).json({
    status: "success",
    message: "Successfully deleted a Product",
  });
};
