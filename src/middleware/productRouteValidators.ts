import { check, query, body } from "express-validator";

export const validateProduct = [
  check("name").isString().notEmpty(),
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

      newVal.forEach((spec: { name: string; price: number }) => {
        if (!spec.name || !spec.price) {
          throw new Error("Invalid specifications format");
        }
      });

      return true;
    })
    .optional(),
];

export const updateProductDetailsValidators = [
  check("name").isString().notEmpty().optional(),
  check("category").isString().notEmpty().optional(),
  check("description").isString().notEmpty().optional(),
  check("quantityInStock").isNumeric().optional(),
  check("visibility").isBoolean().optional(),
];

export const updateProductSpecificationsValidators = [
  body("specifications")
    .isArray({ min: 1 })
    .withMessage("At least one specification is required"),

  body("specifications.*.name")
    .exists()
    .withMessage("Specification name is required")
    .isString()
    .withMessage("Specification name must be a string"),

  body("specifications.*.price")
    .exists()
    .withMessage("Specification price is required")
    .isNumeric()
    .withMessage("Specification price must be a number"),
];

export const validateSearchProducts = [
  query("name").exists().withMessage("Name is required"),
  query("category").optional(),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid pageSize"),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
  query("visibility")
    .optional()
    .isBoolean()
    .withMessage("Invalid visibility value"),
];

export const validateGetProductsByCategory = [
  query("category").exists().withMessage("Category is required"),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid pageSize"),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
  query("visibility")
    .optional()
    .isBoolean()
    .withMessage("Invalid visibility value"),
];

export const validateGetProducts = [
  query("visibility")
    .optional()
    .isBoolean()
    .withMessage("Invalid visibility value"),
  query("pageSize")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Invalid pageSize"),
  query("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
];
