import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateProduct = [
  body("name").isString().notEmpty(),
  body("image_url").isString().notEmpty().optional(),
  body("category").isString().notEmpty(),
  body("description").isString().notEmpty().optional(),
  body("quantityInStock").isNumeric(),
  body("visibility").isBoolean(),
  body("specifications").isArray().notEmpty(),
  body("specifications.*.name").isString().notEmpty(),
  body("specifications.*.price").isNumeric(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
