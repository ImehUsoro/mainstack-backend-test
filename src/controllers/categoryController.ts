import { Request, Response } from "express";
import {
  createCategoryService,
  deleteCategoryService,
  findCategoryByIdAndRespondService,
  getCategoriesService,
  updateCategoryService,
} from "../services/categoryService";

export const createCategory = async (req: Request, res: Response) => {
  const { body } = req;
  await createCategoryService(body, res);
};

export const getCategories = async (_req: Request, res: Response) => {
  await getCategoriesService(res);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await findCategoryByIdAndRespondService(id, res);
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  await updateCategoryService(id, body, res);
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteCategoryService(id, res);
};
