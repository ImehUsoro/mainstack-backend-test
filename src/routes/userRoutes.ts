import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  registerUser,
  updateUser,
} from "../controllers/userController";
import {
  validateRegistration,
  validateId,
  validateUpdateUser,
} from "../middleware/userRouteValidators";
import authenticateToken from "../middleware/authenticateToken";

const router = Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", login);
router.get("/get-users", authenticateToken, getAllUsers);
router.get("/get-user/:id", authenticateToken, validateId, getUserById);
router.patch(
  "/update-user/:id",
  authenticateToken,
  validateId,
  validateUpdateUser,
  updateUser
);
router.delete("/delete-user/:id", authenticateToken, validateId, deleteUser);

export default router;
