"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const express_validator_1 = require("express-validator");
exports.validateProduct = [
    (0, express_validator_1.body)("name").isString().notEmpty(),
    (0, express_validator_1.body)("image_url").isString().notEmpty().optional(),
    (0, express_validator_1.body)("category").isString().notEmpty(),
    (0, express_validator_1.body)("description").isString().notEmpty().optional(),
    (0, express_validator_1.body)("quantityInStock").isNumeric(),
    (0, express_validator_1.body)("visibility").isBoolean(),
    (0, express_validator_1.body)("specifications").isArray().notEmpty(),
    (0, express_validator_1.body)("specifications.*.name").isString().notEmpty(),
    (0, express_validator_1.body)("specifications.*.price").isNumeric(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
