"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const userRouteValidators_1 = require("../middleware/userRouteValidators");
const router = (0, express_1.Router)();
exports.categoryRoutes = router;
router.post("/create-category", authenticateToken_1.default, categoryController_1.createCategory);
router.get("/get-categories", authenticateToken_1.default, categoryController_1.getCategories);
router.get("/get-category/:id", authenticateToken_1.default, userRouteValidators_1.validateId, categoryController_1.getCategoryById);
router.patch("/update-category/:id", authenticateToken_1.default, userRouteValidators_1.validateId, categoryController_1.updateCategory);
router.delete("/delete-category/:id", authenticateToken_1.default, userRouteValidators_1.validateId, categoryController_1.deleteCategory);
