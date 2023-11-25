"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUsers = exports.login = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email, firstName, lastName } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "This email already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });
        yield newUser.save();
        const userObject = newUser.toObject();
        return res.status(201).json({ message: "success", user: userObject });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const accessToken = (0, utils_1.generateAccessToken)({
            email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        return res.status(201).json({ message: "success", user, accessToken });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}).select("-password");
        return res.status(200).json({ message: "success", users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "success", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.email = email || user.email;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        yield user.save();
        return res.status(200).json({ message: "success", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUser = updateUser;
