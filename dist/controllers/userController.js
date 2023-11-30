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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.login = exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const userService_1 = require("../services/userService");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, userService_1.createUserService)(body, res);
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, userService_1.loginService)(body, res);
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize } = (0, express_validator_1.matchedData)(req);
    yield (0, userService_1.getAllUsersService)(res, page, pageSize);
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, userService_1.findUserByIdAndRespondService)(id, res);
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userData } = req.body;
    yield (0, userService_1.updateUserByIdService)(id, userData, res);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, userService_1.deleteUserByIdService)(id, res);
});
exports.deleteUser = deleteUser;
