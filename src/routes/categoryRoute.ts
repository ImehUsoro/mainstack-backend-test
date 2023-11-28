import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController";
import authenticateToken from "../middleware/authenticateToken";
import { validateId } from "../middleware/userRouteValidators";

const router = Router();

router.post("/create-category", authenticateToken, createCategory);
router.get("/get-categories", authenticateToken, getCategories);
router.get("/get-category/:id", authenticateToken, validateId, getCategoryById);
router.patch(
  "/update-category/:id",
  authenticateToken,
  validateId,
  updateCategory
);
router.delete(
  "/delete-category/:id",
  authenticateToken,
  validateId,
  deleteCategory
);

export { router as categoryRoutes };
