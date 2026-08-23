import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo, getTodoByDate, getTodoByDueDate } from "../controllers/todo.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/create", authenticateToken, createTodo);
router.get("/get", authenticateToken, getTodo);
router.put("/edit/:todoId", authenticateToken, updateTodo);
router.delete("/delete/:todoId", authenticateToken, deleteTodo);
router.query("/getByDate", authenticateToken, getTodoByDate);
router.query("/getByDueDate", authenticateToken, getTodoByDueDate);

export default router;