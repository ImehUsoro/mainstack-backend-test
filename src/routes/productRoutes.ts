import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProduct,
  updateProduct,
  updateProductImage,
  updateProductSpecifications,
} from "../controllers/productController";
import authenticateToken from "../middleware/authenticateToken";
import {
  updateProductDetailsValidators,
  updateProductSpecificationsValidators,
  validateGetProductsByCategory,
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

router.get(
  "/get-products-by-category",
  authenticateToken,
  validateGetProductsByCategory,
  validate,
  getProductsByCategory
);

router.patch(
  "/update-product-details/:id",
  authenticateToken,
  validateId,
  updateProductDetailsValidators,
  validate,
  updateProduct
);

router.patch(
  "/update-product-image/:id",
  authenticateToken,
  uploadSingle,
  validateId,
  validate,
  updateProductImage
);

router.patch(
  "/update-product-specifications/:id",
  authenticateToken,
  validateId,
  updateProductSpecificationsValidators,
  validate,
  updateProductSpecifications
);

router.delete(
  "/delete-product/:id",
  authenticateToken,
  validateId,
  validate,
  deleteProduct
);

export { router as productRoutes };
