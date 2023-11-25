import express, { Request, Response, NextFunction } from "express";
require("dotenv").config();
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || "";

app.use(express.json());
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as Parameters<typeof mongoose.connect>[1]);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error: ${err.message}`);

  // Handle MongoDB validation error
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  // Handle other errors
  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
