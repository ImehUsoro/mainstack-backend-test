"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const notFound_1 = require("./middleware/notFound");
const routes_1 = require("./routes");
const requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
require("dotenv").config();
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || "";
exports.app.use(express_1.default.json());
mongoose_1.default.connect(MONGO_URI);
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
});
exports.app.use(requestLogger_1.default);
exports.app.use("/api/v1", routes_1.applicationRoutes);
exports.app.use(notFound_1.notFound);
exports.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
