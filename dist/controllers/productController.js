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
exports.deleteProduct = exports.updateProductSpecifications = exports.updateProductImage = exports.updateProduct = exports.getProductsByCategory = exports.searchProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const express_validator_1 = require("express-validator");
const productService_1 = require("../services/productService");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.createProductService)(req, res, data);
});
exports.createProduct = createProduct;
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, productService_1.getAllProductsService)(res);
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.getProductByIdAndRespondService)(id, res);
});
exports.getProductById = getProductById;
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, page, pageSize } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.searchProductService)(name, res, page, pageSize, category);
});
exports.searchProduct = searchProduct;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, page, pageSize } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.getProductsByCategoryService)(category, res, page, pageSize);
});
exports.getProductsByCategory = getProductsByCategory;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProduct = updateProduct;
const updateProductImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProductImage = updateProductImage;
const updateProductSpecifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProductSpecifications = updateProductSpecifications;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, express_validator_1.matchedData)(req);
    yield (0, productService_1.deleteProductService)(id, res);
});
exports.deleteProduct = deleteProduct;
