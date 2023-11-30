"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const userRouteValidators_1 = require("../middleware/userRouteValidators");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
exports.userRoutes = router;
router.post("/register", userRouteValidators_1.validateRegistration, validate_1.validate, userController_1.registerUser);
router.post("/login", userRouteValidators_1.validateLogin, validate_1.validate, userController_1.login);
router.get("/get-users", authenticateToken_1.default, userRouteValidators_1.validateGetUsers, validate_1.validate, userController_1.getAllUsers);
router.get("/get-user/:id", authenticateToken_1.default, userRouteValidators_1.validateId, validate_1.validate, userController_1.getUserById);
router.patch("/update-user/:id", authenticateToken_1.default, userRouteValidators_1.validateId, userRouteValidators_1.validateUpdateUser, validate_1.validate, userController_1.updateUser);
router.delete("/delete-user/:id", authenticateToken_1.default, userRouteValidators_1.validateId, validate_1.validate, userController_1.deleteUser);
