"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateUser = exports.validateId = exports.validateRegistration = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware
exports.validateRegistration = [
    (0, express_validator_1.body)("firstName").notEmpty().withMessage("First name is required"),
    (0, express_validator_1.body)("lastName").notEmpty().withMessage("Last name is required"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
exports.validateId = [
    (0, express_validator_1.check)("id").isMongoId().withMessage("Invalid MongoDB ID"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
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
    (0, express_validator_1.check)("userData.firstName")
        .optional()
        .notEmpty()
        .withMessage("First name cannot be empty"),
    (0, express_validator_1.check)("userData.lastName")
        .optional()
        .notEmpty()
        .withMessage("Last name cannot be empty"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
