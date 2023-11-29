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
  updateProductImageService,
  updateProductService,
  updateProductSpecificationsService,
} from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  const data = matchedData(req) as CreateProductDto;
  await createProductService(req, res, data);
};

export const getProducts = async (req: Request, res: Response) => {
  const { page, pageSize, visibility } = matchedData(req);
  await getAllProductsService(res, page, pageSize, visibility);
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = matchedData(req);
  await getProductByIdAndRespondService(id, res);
};

export const searchProduct = async (req: Request, res: Response) => {
  const { name, category, visibility, page, pageSize } = matchedData(req);
  await searchProductService(name, res, page, pageSize, category, visibility);
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  const { category, page, pageSize, visibility } = matchedData(req);
  await getProductsByCategoryService(category, res, page, pageSize, visibility);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id, ...rest } = matchedData(req);
  await updateProductService(id, rest as CreateProductDto, res);
};

export const updateProductImage = async (req: Request, res: Response) => {
  const { id } = matchedData(req);
  await updateProductImageService(id, req, res);
};

export const updateProductSpecifications = async (
  req: Request,
  res: Response
) => {
  const { id, specifications } = matchedData(req);
  await updateProductSpecificationsService(id, specifications, res);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = matchedData(req);
  await deleteProductService(id, res);
};
