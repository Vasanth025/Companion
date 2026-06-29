import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/create", authenticateToken, createTodo);
router.get("/getall", authenticateToken, getTodo);
router.put("/edit", authenticateToken, updateTodo);
router.delete("/delete", authenticateToken, deleteTodo);

export default router;