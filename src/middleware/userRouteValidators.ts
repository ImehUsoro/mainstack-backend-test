import { body, check } from "express-validator";

export const validateRegistration = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validateId = [
  check("id").isMongoId().withMessage("Invalid MongoDB ID"),
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
  body("userData.firstName").notEmpty().isString().optional(),
  body("userData.lastName").notEmpty().isString().optional(),
];
