import { Request, Response } from "express";
import { CreateProductDto, SpecificationDto } from "../dtos/products";
import Product from "../models/Product";
import { uploadToCloudinary } from "../utils/fileUploader";
import {
  findCategoryByIdService,
  findCategoryBySearchedNameService,
} from "./categoryService";

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

    const getCategory = await findCategoryByIdService(rest.category);

    if (!getCategory) {
      return res.status(400).json({
        status: "error",
        error: "Category does not exist",
      });
    }

    const { secure_url } = await uploadToCloudinary(req);
    const product = await Product.create({
      name,
      specifications: specifications ? JSON.parse(specifications) : [],
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

export const getAllProductsService = async (
  res: Response,
  page: number = 1,
  pageSize: number = 10,
  visibility?: boolean
) => {
  try {
    const query: {
      [key: string]: boolean;
    } = {};

    if (visibility !== undefined) {
      query.visibility = visibility;
    }

    const skip = (page - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(query)
        .skip(skip)
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .populate({
          path: "category",
          select: "name",
        }),
      Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / pageSize);
    const currentPage = page > totalPages ? totalPages : page;

    return res.status(200).json({
      status: "success",
      message: "Successfully retrieved all Products",
      data: { products, total, currentPage, pageSize, totalPages },
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
  const product = await Product.findById(productId).populate({
    path: "category",
    select: "name",
  });

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
  category?: string,
  visibility?: boolean
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

  if (visibility !== undefined) {
    query.visibility = visibility;
  }

  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    Product.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate({
        path: "category",
        select: "name",
      }),
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
  pageSize: number = 10,
  visibility?: boolean
) => {
  const foundCategory = await findCategoryBySearchedNameService(category);

  if (!foundCategory) {
    return res
      .status(404)
      .json({ status: "error", error: "Category not found" });
  }

  const query: {
    [key: string]: boolean | string;
  } = {
    category: foundCategory._id,
  };

  if (visibility !== undefined) {
    query.visibility = visibility;
  }

  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    Product.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .populate({
        path: "category",
        select: "name",
      }),
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

export const updateProductService = async (
  productId: string,
  data: CreateProductDto,
  res: Response
) => {
  const product = await getProductByIdService(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", error: "Product not found" });
  }

  if (data.category) {
    const getCategory = await findCategoryByIdService(data.category);

    if (!getCategory) {
      return res.status(400).json({
        status: "error",
        error: "Category does not exist",
      });
    }
  }

  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { ...data }
  );

  return res.status(200).json({
    status: "success",
    message: "Successfully updated a Product",
    product: updatedProduct,
  });
};

export const updateProductImageService = async (
  productId: string,
  req: Request,
  res: Response
) => {
  const product = await getProductByIdService(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", error: "Product not found" });
  }

  const { secure_url } = await uploadToCloudinary(req);

  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { image_url: secure_url }
  );

  return res.status(200).json({
    status: "success",
    message: "Successfully updated a Product",
    product: updatedProduct,
  });
};

export const updateProductSpecificationsService = async (
  productId: string,
  specifications: SpecificationDto[],
  res: Response
) => {
  const product = await getProductByIdService(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: "error", error: "Product not found" });
  }

  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { specifications }
  );

  return res.status(200).json({
    status: "success",
    message: "Successfully updated a Product",
    product: updatedProduct,
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
