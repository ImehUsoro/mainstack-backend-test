import { check, query } from "express-validator";

export const validateProduct = [
  check("name").isString().notEmpty(),
  check("image_url").isString().notEmpty().optional(),
  check("category").isString().notEmpty(),
  check("description").isString().notEmpty().optional(),
  check("quantityInStock").isNumeric(),
  check("visibility").isBoolean(),
  check("specifications")
    .exists()
    .withMessage("Specifications are required")
    .notEmpty()
    .withMessage("Specifications cannot be empty")
    .custom((value) => {
      let newVal = value;

      if (newVal) newVal = JSON.parse(value);

      if (!Array.isArray(newVal)) {
        throw new Error("Invalid specifications format");
      }
      if (newVal.length < 1) {
        throw new Error("Specifications cannot be empty");
      }

      newVal.forEach((spec: any) => {
        if (!spec.name || !spec.price) {
          throw new Error("Invalid specifications format");
        }
      });

      return true;
    }),
];

export const validateSearchProducts = [
  query("name").exists().withMessage("Name is required"),
  query("category").optional(),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid pageSize"),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
];

export const validateGetProductsByCategory = [
  query("category").exists().withMessage("Category is required"),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid pageSize"),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
];
