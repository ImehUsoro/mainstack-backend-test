import { Router } from "express";
import { login, registerUser } from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);

export default router;
