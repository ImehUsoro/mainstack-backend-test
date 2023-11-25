"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || "";
app.use(express_1.default.json());
app.use("/api/v1", userRoutes_1.default);
app.use("/api/v1", productRoutes_1.default);
mongoose_1.default.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
});
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    // Handle MongoDB validation error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        return res.status(400).json({ error: err.message });
    }
    // Handle other errors
    return res.status(500).json({ error: "Internal Server Error" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
