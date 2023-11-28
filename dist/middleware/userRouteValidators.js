"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateId = exports.validateLogin = exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
exports.validateRegistration = [
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.validateLogin = [
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
];
exports.validateId = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid MongoDB ID"),
];
exports.validateUpdateUser = [
    (0, express_validator_1.check)("userData")
        .optional()
        .isObject()
        .custom((value) => {
        if (Object.keys(value).length < 1) {
            throw new Error("Invalid user data format");
        }
        return true;
    })
        .withMessage("Invalid user data format"),
    (0, express_validator_1.body)("userData.firstName").notEmpty().isString().optional(),
    (0, express_validator_1.body)("userData.lastName").notEmpty().isString().optional(),
];
