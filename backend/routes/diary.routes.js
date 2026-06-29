import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/authenticateToken.js";
import { createDiaryEntry, deleteDiaryEntry, editDiaryEntry, getAllDiaryEntries } from "../controllers/diary.controller.js";

router.post("/create", authenticateToken, createDiaryEntry);
router.get("/getall", authenticateToken, getAllDiaryEntries);
router.put("/edit", authenticateToken, editDiaryEntry);
router.delete("/delete", authenticateToken, deleteDiaryEntry);

export default router;
