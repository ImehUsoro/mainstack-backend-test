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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByIdService = exports.updateUserByIdService = exports.findUserByIdService = exports.findUserByIdAndRespondService = exports.getAllUsersService = exports.findUserByEmailService = exports.loginService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
const createUserService = (body, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = body;
        const existingUser = yield (0, exports.findUserByEmailService)(email);
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                error: "User with this email already exists",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.default.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        const userWithoutPassword = user.toObject();
        const { password: _ } = userWithoutPassword, rest = __rest(userWithoutPassword, ["password"]);
        return res.status(201).json({
            status: "success",
            message: "Successfully created a new User",
            rest,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});
exports.createUserService = createUserService;
const loginService = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = data;
        const user = yield (0, exports.findUserByEmailService)(email);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res
                .status(401)
                .json({ status: "error", error: "Invalid credentials" });
        }
        const accessToken = (0, utils_1.generateAccessToken)({
            email,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        const userWithoutPassword = user.toObject();
        const { password: _ } = userWithoutPassword, rest = __rest(userWithoutPassword, ["password"]);
        return res.status(201).json({
            status: "success",
            message: "Login successful",
            user: rest,
            accessToken,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});
exports.loginService = loginService;
const findUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = User_1.default.findOne({ email });
    if (!user) {
        return null;
    }
    return user;
});
exports.findUserByEmailService = findUserByEmailService;
const getAllUsersService = (res, page = 1, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * pageSize;
        const [users, total] = yield Promise.all([
            User_1.default.find().skip(skip).limit(pageSize).select("-password"),
            User_1.default.countDocuments(),
        ]);
        const totalPages = Math.ceil(total / pageSize);
        const currentPage = page > totalPages ? totalPages : page;
        return res.status(200).json({
            status: "success",
            message: "Users successfully retrieved",
            data: {
                users,
                total,
                currentPage,
                pageSize,
                totalPages,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});
exports.getAllUsersService = getAllUsersService;
const findUserByIdAndRespondService = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.status(200).json({
            status: "success",
            message: "User successfully retrieved",
            user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});
exports.findUserByIdAndRespondService = findUserByIdAndRespondService;
const findUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findById(id).select("-password");
    if (!user) {
        return null;
    }
    return user;
});
exports.findUserByIdService = findUserByIdService;
const updateUserByIdService = (userId, data, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserByIdService)(userId);
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        yield User_1.default.updateOne({ _id: userId }, Object.assign({}, data));
        return res.status(200).json({
            status: "success",
            message: "User updated successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
    }
});
exports.updateUserByIdService = updateUserByIdService;
const deleteUserByIdService = (userId, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res
            .status(200)
            .json({ status: "success", message: "User deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteUserByIdService = deleteUserByIdService;
