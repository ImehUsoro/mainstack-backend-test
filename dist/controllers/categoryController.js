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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const categoryService_1 = require("../services/categoryService");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    yield (0, categoryService_1.createCategoryService)(body, res);
});
exports.createCategory = createCategory;
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, categoryService_1.getCategoriesService)(res);
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, categoryService_1.findCategoryByIdAndRespondService)(id, res);
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    yield (0, categoryService_1.updateCategoryService)(id, body, res);
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, categoryService_1.deleteCategoryService)(id, res);
});
exports.deleteCategory = deleteCategory;
