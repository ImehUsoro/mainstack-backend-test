"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/protectedRoutes.ts
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../middleware/authenticateToken"));
const router = (0, express_1.Router)();
router.get('/protected-resource', authenticateToken_1.default, (req, res) => {
    res.json({ message: 'Access granted to protected resource!' });
});
exports.default = router;
