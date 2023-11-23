"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = (0, express_1.Router)();
router.post("/products", authenticateToken_1.default, productController_1.createProduct);
router.get("/products", authenticateToken_1.default, productController_1.getProducts);
exports.default = router;
