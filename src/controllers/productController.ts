import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { CreateProductDto } from "../dtos/products";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdAndRespondService,
  getProductsByCategoryService,
  searchProductService,
} from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  const data = matchedData(req) as CreateProductDto;
  await createProductService(req, res, data);
};

export const getProducts = async (_req: Request, res: Response) => {
  await getAllProductsService(res);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = matchedData(req);
  await getProductByIdAndRespondService(id, res);
};

export const searchProduct = async (req: Request, res: Response) => {
  const { name, category, page, pageSize } = matchedData(req);
  await searchProductService(name, res, page, pageSize, category);
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category, page, pageSize } = matchedData(req);
  await getProductsByCategoryService(category, res, page, pageSize);
};

export const updateProduct = async (req: Request, res: Response) => {};

export const updateProductImage = async (req: Request, res: Response) => {};

export const updateProductSpecifications = async (
  req: Request,
  res: Response
) => {};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = matchedData(req);
  await deleteProductService(id, res);
};
