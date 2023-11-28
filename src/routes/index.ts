import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { productRoutes } from "./productRoutes";
import { categoryRoutes } from "./categoryRoute";

const router = Router();

router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/category", categoryRoutes);

export { router as applicationRoutes };
