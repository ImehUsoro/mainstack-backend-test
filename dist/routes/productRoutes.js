"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const userRouteValidators_1 = require("../middleware/userRouteValidators");
const router = (0, express_1.Router)();
router.post("/create-product", authenticateToken_1.default, productController_1.createProduct);
router.get("/get-products", authenticateToken_1.default, productController_1.getProducts);
router.get("/get-product/:id", authenticateToken_1.default, userRouteValidators_1.validateId);
router.get("search-product", authenticateToken_1.default);
router.patch("/update-product/:id", authenticateToken_1.default, userRouteValidators_1.validateId);
router.delete("/delete-product/:id", authenticateToken_1.default, userRouteValidators_1.validateId);
exports.default = router;
