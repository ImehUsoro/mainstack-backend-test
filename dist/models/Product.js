"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const specificationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    price: {
        type: Number,
        required: true,
    },
});
const ProductSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image_url: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    description: {
        type: String,
        required: false,
    },
    quantityInStock: {
        type: Number,
        required: true,
    },
    visibility: {
        type: Boolean,
        default: true,
    },
    specifications: {
        type: [specificationSchema],
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Product", ProductSchema);
