import express from "express";
const router = express.Router();
import { authenticateToken } from "../middleware/authenticateToken.js";
import { createDiaryEntry, deleteDiaryEntry, editDiaryEntry, getAllDiaryEntries } from "../controllers/diary.controller.js";

router.post("/create", authenticateToken, createDiaryEntry);
router.get("/getall", authenticateToken, getAllDiaryEntries);
router.put("/edit/:diaryEntryId", authenticateToken, editDiaryEntry);
router.delete("/delete/:diaryEntryId", authenticateToken, deleteDiaryEntry);

export default router;
