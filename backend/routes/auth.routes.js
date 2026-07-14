import express from "express";
import { getMe, Login, Signup } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.get("/me", authenticateToken, getMe)

export default router;
