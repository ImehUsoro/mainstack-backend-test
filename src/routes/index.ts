import { Router } from "express";
import { categoryRoutes } from "./categoryRoute";
import { productRoutes } from "./productRoutes";
import { userRoutes } from "./userRoutes";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);

export { router as applicationRoutes };
