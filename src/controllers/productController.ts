import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { CreateProductDto } from "../dtos/products";
import Product from "../models/Product";
import {
  createProductService,
  getAllProductsService,
  getProductByIdAndRespondService,
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
