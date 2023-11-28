import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  registerUser,
  updateUser,
} from "../controllers/userController";
import authenticateToken from "../middleware/authenticateToken";
import {
  validateId,
  validateLogin,
  validateRegistration,
  validateUpdateUser,
} from "../middleware/userRouteValidators";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/register", validateRegistration, validate, registerUser);
router.post("/login", validateLogin, validate, login);
router.get("/get-users", authenticateToken, getAllUsers);
router.get(
  "/get-user/:id",
  authenticateToken,
  validateId,
  validate,
  getUserById
);
router.patch(
  "/update-user/:id",
  authenticateToken,
  validateId,
  validateUpdateUser,
  validate,
  updateUser
);
router.delete(
  "/delete-user/:id",
  authenticateToken,
  validateId,
  validate,
  deleteUser
);

export { router as userRoutes };
