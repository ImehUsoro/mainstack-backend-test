import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post("/products", authenticateToken, createProduct);
router.get("/products", authenticateToken, getProducts);

export default router;
