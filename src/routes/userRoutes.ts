import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  registerUser,
  updateUser,
} from "../controllers/userController";
import validateRegistration, {
  validateId,
  validateUpdateUser,
} from "../middleware/registerUserValidator";

const router = Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", login);
router.get("/get-users", getAllUsers);
router.get("/get-user/:id", validateId, getUserById);
router.patch("/update-user/:id", validateId, validateUpdateUser, updateUser);
router.delete("/delete-user/:id", validateId, deleteUser);

export default router;
