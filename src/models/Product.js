"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var specificationSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
var ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
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
