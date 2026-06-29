import express from "express";
import { createNote, deleteNote, editNote, getNote } from "../controllers/notes.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/create", authenticateToken, createNote);
router.get("/getall", authenticateToken, getNote);
router.put("/edit", authenticateToken, editNote);
router.delete("/delete", authenticateToken, deleteNote);

export default router;
