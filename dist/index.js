"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const notFound_1 = require("./middleware/notFound");
const routes_1 = require("./routes");
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || "";
app.use(express_1.default.json());
mongoose_1.default.connect(MONGO_URI);
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
});
app.use("/api/v1", routes_1.applicationRoutes);
app.use(notFound_1.notFound);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
