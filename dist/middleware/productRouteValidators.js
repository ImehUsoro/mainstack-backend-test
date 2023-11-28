"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetProductsByCategory = exports.validateSearchProducts = exports.updateProductSpecificationsValidators = exports.updateProductDetailsValidators = exports.validateProduct = void 0;
const express_validator_1 = require("express-validator");
exports.validateProduct = [
    (0, express_validator_1.check)("name").isString().notEmpty(),
    (0, express_validator_1.check)("category").isString().notEmpty(),
    (0, express_validator_1.check)("description").isString().notEmpty().optional(),
    (0, express_validator_1.check)("quantityInStock").isNumeric(),
    (0, express_validator_1.check)("visibility").isBoolean(),
    (0, express_validator_1.check)("specifications")
        .exists()
        .withMessage("Specifications are required")
        .notEmpty()
        .withMessage("Specifications cannot be empty")
        .custom((value) => {
        let newVal = value;
        if (newVal)
            newVal = JSON.parse(value);
        if (!Array.isArray(newVal)) {
            throw new Error("Invalid specifications format");
        }
        if (newVal.length < 1) {
            throw new Error("Specifications cannot be empty");
        }
        newVal.forEach((spec) => {
            if (!spec.name || !spec.price) {
                throw new Error("Invalid specifications format");
            }
        });
        return true;
    }),
];
exports.updateProductDetailsValidators = [
    (0, express_validator_1.check)("name").isString().notEmpty().optional(),
    (0, express_validator_1.check)("category").isString().notEmpty().optional(),
    (0, express_validator_1.check)("description").isString().notEmpty().optional(),
    (0, express_validator_1.check)("quantityInStock").isNumeric().optional(),
    (0, express_validator_1.check)("visibility").isBoolean().optional(),
];
exports.updateProductSpecificationsValidators = [
    (0, express_validator_1.body)("specifications")
        .isArray({ min: 1 })
        .withMessage("At least one specification is required"),
    (0, express_validator_1.body)("specifications.*.name")
        .exists()
        .withMessage("Specification name is required")
        .isString()
        .withMessage("Specification name must be a string"),
    (0, express_validator_1.body)("specifications.*.price")
        .exists()
        .withMessage("Specification price is required")
        .isNumeric()
        .withMessage("Specification price must be a number"),
];
exports.validateSearchProducts = [
    (0, express_validator_1.query)("name").exists().withMessage("Name is required"),
    (0, express_validator_1.query)("category").optional(),
    (0, express_validator_1.query)("pageSize")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Invalid pageSize"),
    (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
];
exports.validateGetProductsByCategory = [
    (0, express_validator_1.query)("category").exists().withMessage("Category is required"),
    (0, express_validator_1.query)("pageSize")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Invalid pageSize"),
    (0, express_validator_1.query)("page").optional().isInt({ min: 1 }).withMessage("Invalid page"),
];
