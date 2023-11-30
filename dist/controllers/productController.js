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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProductSpecifications = exports.updateProductImage = exports.updateProduct = exports.getProductsByCategory = exports.searchProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const express_validator_1 = require("express-validator");
const productService_1 = require("../services/productService");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.createProductService)(req, res, data);
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, pageSize, visibility } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.getAllProductsService)(res, page, pageSize, visibility);
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.getProductByIdAndRespondService)(id, res);
});
exports.getProductById = getProductById;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, visibility, page, pageSize } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.searchProductService)(name, res, page, pageSize, category, visibility);
});
exports.searchProduct = searchProduct;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, page, pageSize, visibility } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.getProductsByCategoryService)(category, res, page, pageSize, visibility);
});
exports.getProductsByCategory = getProductsByCategory;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = (0, express_validator_1.matchedData)(req), { id } = _a, rest = __rest(_a, ["id"]);
    yield (0, productService_1.updateProductService)(id, rest, res);
});
exports.updateProduct = updateProduct;
const updateProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.updateProductImageService)(id, req, res);
});
exports.updateProductImage = updateProductImage;
const updateProductSpecifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, specifications } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.updateProductSpecificationsService)(id, specifications, res);
});
exports.updateProductSpecifications = updateProductSpecifications;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.deleteProductService)(id, res);
});
exports.deleteProduct = deleteProduct;
