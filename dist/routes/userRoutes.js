"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouteValidators_1 = require("../middleware/userRouteValidators");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = (0, express_1.Router)();
router.post("/register", userRouteValidators_1.validateRegistration, userController_1.registerUser);
router.post("/login", userController_1.login);
router.get("/get-users", authenticateToken_1.default, userController_1.getAllUsers);
router.get("/get-user/:id", authenticateToken_1.default, userRouteValidators_1.validateId, userController_1.getUserById);
router.patch("/update-user/:id", authenticateToken_1.default, userRouteValidators_1.validateId, userRouteValidators_1.validateUpdateUser, userController_1.updateUser);
router.delete("/delete-user/:id", authenticateToken_1.default, userRouteValidators_1.validateId, userController_1.deleteUser);
exports.default = router;
