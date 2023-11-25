"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const registerUserValidator_1 = __importDefault(require("../middleware/registerUserValidator"));
const router = (0, express_1.Router)();
router.post("/register", registerUserValidator_1.default, userController_1.registerUser);
router.post("/login", userController_1.login);
router.get("/get-users", userController_1.getAllUsers);
router.get("/get-user/:id", userController_1.getUserById);
router.patch("/update-user/:id");
router.delete("/delete-user/:id");
exports.default = router;
