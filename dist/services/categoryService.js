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
exports.deleteCategoryService = exports.updateCategoryService = exports.getCategoriesService = exports.findCategoryByIdService = exports.findCategoryByIdAndRespondService = exports.findCategoryBySearchedNameService = exports.findCategoryByNameService = exports.createCategoryService = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategoryService = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = data;
        const existingCategory = yield (0, exports.findCategoryByNameService)(name);
        if (existingCategory) {
            return res.status(400).json({
                status: "error",
                error: "This category already exists",
            });
        }
        const category = yield Category_1.default.create({
            name,
        });
        return res.status(201).json({
            status: "success",
            message: "Successfully created a new Category",
            category,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
});
exports.createCategoryService = createCategoryService;
const findCategoryByNameService = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const category = Category_1.default.findOne({ name: categoryName });
    if (!category) {
        return null;
    }
    return category;
});
exports.findCategoryByNameService = findCategoryByNameService;
const findCategoryBySearchedNameService = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const category = Category_1.default.findOne({
        name: { $regex: new RegExp(categoryName, "i") },
    });
    if (!category) {
        return null;
    }
    return category;
});
exports.findCategoryBySearchedNameService = findCategoryBySearchedNameService;
const findCategoryByIdAndRespondService = (categoryId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield Category_1.default.findById(categoryId);
    if (!category) {
        return res
            .status(404)
            .json({ status: "error", error: "Category not found" });
    }
    return res.status(200).json({
        status: "success",
        message: "Successfully created a new Category",
        category,
    });
});
exports.findCategoryByIdAndRespondService = findCategoryByIdAndRespondService;
const findCategoryByIdService = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = Category_1.default.findById(categoryId);
    if (!category) {
        return null;
    }
    return category;
});
exports.findCategoryByIdService = findCategoryByIdService;
const getCategoriesService = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        return res.status(200).json({
            status: "success",
            message: "Successfully retrieved all Products",
            categories,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
    }
});
exports.getCategoriesService = getCategoriesService;
const updateCategoryService = (categoryId, data, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, exports.findCategoryByIdService)(categoryId);
    if (!category) {
        return res
            .status(404)
            .json({ status: "error", error: "Category not found" });
    }
    yield Category_1.default.updateOne({ _id: categoryId }, Object.assign({}, data));
    return res.status(200).json({
        status: "success",
        message: "Successfully updated category",
    });
});
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = (categoryId, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, exports.findCategoryByIdService)(categoryId);
    if (!category) {
        return res
            .status(404)
            .json({ status: "error", error: "Category not found" });
    }
    yield Category_1.default.deleteOne({ _id: categoryId });
    return res
        .status(200)
        .json({ status: "success", message: "Successfully deleted category" });
});
exports.deleteCategoryService = deleteCategoryService;
