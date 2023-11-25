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
exports.getProducts = exports.createProductWithUpload = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const multer_1 = __importDefault(require("multer"));
const cloudinaryConfig_1 = __importDefault(require("../config/cloudinaryConfig"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const singleUpload = upload.single("image");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.file) {
        //   return res.status(400).json({ error: "File is required" });
        // }
        const { name, category, description, quantityInStock, visibility, specifications, } = req.body;
        const result = yield cloudinaryConfig_1.default.uploader.upload(req.file.buffer.toString("base64"));
        const newProduct = new Product_1.default({
            name,
            category,
            description,
            quantityInStock,
            visibility,
            specifications,
            image_url: result.secure_url,
        });
        yield newProduct.save();
        return res
            .status(201)
            .json({ message: "Product created successfully", product: newProduct });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createProduct = createProduct;
const singleUploadMiddleware = (req, res, next) => {
    singleUpload(req, res, (err) => {
        if (err) {
            return res
                .status(400)
                .json({ error: "File upload error", message: err.message });
        }
        next();
    });
};
exports.createProductWithUpload = [singleUploadMiddleware, exports.createProduct];
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getProducts = getProducts;
