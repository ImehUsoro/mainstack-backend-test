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
exports.deleteProductService = exports.getProductsByCategoryService = exports.searchProductService = exports.getProductByIdAndRespondService = exports.getProductByIdService = exports.getAllProductsService = exports.findProductByNameService = exports.createProductService = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const fileUploader_1 = require("../utils/fileUploader");
const categoryService_1 = require("./categoryService");
const createProductService = (req, res, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { specifications, name } = data, rest = __rest(data, ["specifications", "name"]);
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const existingProduct = yield (0, exports.findProductByNameService)(name);
        if (existingProduct) {
            return res.status(400).json({
                status: "error",
                error: "This product already exists",
            });
        }
        const { secure_url } = yield (0, fileUploader_1.uploadToCloudinary)(req);
        const product = yield Product_1.default.create(Object.assign({ name, specifications: JSON.parse(specifications), image_url: secure_url }, rest));
        return res.status(201).json({
            status: "success",
            message: "Successfully created a new Product",
            product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});
exports.createProductService = createProductService;
const findProductByNameService = (productName) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findOne({ name: productName });
    if (!product) {
        return null;
    }
    return product;
});
exports.findProductByNameService = findProductByNameService;
const getAllProductsService = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved all Products",
            products,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
    }
});
exports.getAllProductsService = getAllProductsService;
const getProductByIdService = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(productId);
    if (!product) {
        return null;
    }
    return product;
});
exports.getProductByIdService = getProductByIdService;
const getProductByIdAndRespondService = (productId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(productId);
    if (!product) {
        return res
            .status(404)
            .json({ status: "error", error: "Product not found" });
    }
    return res.status(200).json({
        status: "success",
        message: "Successfully retrieved a Product",
        product,
    });
});
exports.getProductByIdAndRespondService = getProductByIdAndRespondService;
const searchProductService = (name, res, page = 1, pageSize = 10, category) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (name) {
        query.name = { $regex: new RegExp(name, "i") };
    }
    if (category) {
        const foundCategory = yield (0, categoryService_1.findCategoryBySearchedNameService)(category);
        if (foundCategory) {
            query.category = foundCategory._id;
        }
    }
    const skip = (page - 1) * pageSize;
    const [products, total] = yield Promise.all([
        Product_1.default.find(query).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
        Product_1.default.countDocuments(query),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    const currentPage = page > totalPages ? totalPages : page;
    res.status(200).json({
        status: "success",
        message: "Successfully retrieved all Products",
        data: { products, total, currentPage, pageSize, totalPages },
    });
});
exports.searchProductService = searchProductService;
const getProductsByCategoryService = (category, res, page = 1, pageSize = 10) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCategory = yield (0, categoryService_1.findCategoryBySearchedNameService)(category);
    if (!foundCategory) {
        return res
            .status(404)
            .json({ status: "error", error: "Category not found" });
    }
    const skip = (page - 1) * pageSize;
    const [products, total] = yield Promise.all([
        Product_1.default.find({ category: foundCategory._id })
            .skip(skip)
            .limit(pageSize)
            .sort({ createdAt: -1 }),
        Product_1.default.countDocuments({ category: foundCategory._id }),
    ]);
    const totalPages = Math.ceil(total / pageSize);
    const currentPage = page > totalPages ? totalPages : page;
    res.status(200).json({
        status: "success",
        message: "Successfully retrieved all Products",
        data: { products, total, currentPage, pageSize, totalPages },
    });
});
exports.getProductsByCategoryService = getProductsByCategoryService;
const deleteProductService = (productId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, exports.getProductByIdService)(productId);
    if (!product) {
        return res
            .status(404)
            .json({ status: "error", error: "Product not found" });
    }
    yield Product_1.default.deleteOne({ _id: productId });
    return res.status(200).json({
        status: "success",
        message: "Successfully deleted a Product",
    });
});
exports.deleteProductService = deleteProductService;
