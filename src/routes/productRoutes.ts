import { Router } from "express";
import { createProduct, getProducts } from "../controllers/productController";
import authenticateToken from "../middleware/authenticateToken";
import { upload } from "../middleware/imageUploadMiddleWare";
import { validateProduct } from "../middleware/productRouteValidators";
import { validateId } from "../middleware/userRouteValidators";
import { validate } from "../middleware/validate";

const router = Router();

router.post(
  "/create-product",
  authenticateToken,
  upload.single("image"),
  validateProduct,
  validate,
  createProduct
);
router.get("/get-products", authenticateToken, getProducts);
router.get("/get-product/:id", authenticateToken, validateId);
router.get("search-product", authenticateToken);
router.patch("/update-product/:id", authenticateToken, validateId);
router.delete("/delete-product/:id", authenticateToken, validateId);

export { router as productRoutes };
