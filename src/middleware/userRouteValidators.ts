import { Request, Response, NextFunction } from "express";
import { body, validationResult, check } from "express-validator";

// Validation middleware
export const validateRegistration = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateId = [
  check("id").isMongoId().withMessage("Invalid MongoDB ID"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateUser = [
  check("userData")
    .optional()
    .isObject()
    .custom((value) => {
      if (Object.keys(value).length < 1) {
        throw new Error("Invalid user data format");
      }
      return true;
    })
    .withMessage("Invalid user data format"),

  check("userData.firstName")
    .optional()
    .notEmpty()
    .withMessage("First name cannot be empty"),

  check("userData.lastName")
    .optional()
    .notEmpty()
    .withMessage("Last name cannot be empty"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
