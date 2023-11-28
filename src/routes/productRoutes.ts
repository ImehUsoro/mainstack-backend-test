import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  searchProduct,
} from "../controllers/productController";
import authenticateToken from "../middleware/authenticateToken";
import {
  validateProduct,
  validateSearchProducts,
} from "../middleware/productRouteValidators";
import { validateId } from "../middleware/userRouteValidators";
import { validate } from "../middleware/validate";
import { uploadSingle } from "../utils/fileUploader";

const router = Router();

router.post(
  "/create-product",
  authenticateToken,
  uploadSingle,
  validateProduct,
  validate,
  createProduct
);
router.get("/get-products", authenticateToken, getProducts);
router.get(
  "/get-product/:id",
  authenticateToken,
  validateId,
  validate,
  getProductById
);
router.get(
  "/search-product",
  authenticateToken,
  validateSearchProducts,
  validate,
  searchProduct
);
router.patch("/update-product/:id", authenticateToken, validateId);
router.patch("/update-product-image/:id", authenticateToken, validateId);
router.patch(
  "/update-product-specifications/:id",
  authenticateToken,
  validateId
);
router.delete("/delete-product/:id", authenticateToken, validateId);

export { router as productRoutes };
