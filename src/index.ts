import express from "express";
import mongoose from "mongoose";
import { notFound } from "./middleware/notFound";
import { applicationRoutes } from "./routes";
import requestLogger from "./middleware/requestLogger";
require("dotenv").config();

export const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGODB_URI || "";

app.use(express.json());

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(requestLogger);
app.use("/api/v1", applicationRoutes);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
