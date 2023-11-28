import { Response } from "express";
import { CreateCategoryDto } from "../dtos/categories";
import Category from "../models/Category";

export const createCategoryService = async (
  data: CreateCategoryDto,
  res: Response
) => {
  try {
    const { name } = data;
    const existingCategory = await findCategoryByNameService(name);

    if (existingCategory) {
      return res.status(400).json({
        error: "This category already exists",
      });
    }

    const category = await Category.create({
      name,
    });

    return res
      .status(201)
      .json({ message: "Successfully created a new Category", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findCategoryByNameService = async (categoryName: string) => {
  const category = Category.findOne({ name: categoryName });

  if (!category) {
    return null;
  }

  return category;
};

export const findCategoryByIdAndRespondService = async (
  categoryId: string,
  res: Response
) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  return res
    .status(200)
    .json({ message: "Successfully created a new Category", category });
};

export const findCategoryByIdService = async (categoryId: string) => {
  const category = Category.findById(categoryId);

  if (!category) {
    return null;
  }

  return category;
};

export const getCategoriesService = async (res: Response) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateCategoryService = async (
  categoryId: string,
  data: CreateCategoryDto,
  res: Response
) => {
  const category = await findCategoryByIdService(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  await Category.updateOne({ _id: categoryId }, { ...data });

  return res.status(200).json({
    message: "Successfully updated category",
  });
};

export const deleteCategoryService = async (
  categoryId: string,
  res: Response
) => {
  const category = await findCategoryByIdService(categoryId);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  await Category.deleteOne({ _id: categoryId });

  return res.status(200).json({ message: "Successfully deleted category" });
};
