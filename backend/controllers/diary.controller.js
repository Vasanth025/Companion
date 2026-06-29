import Diary from "../models/diary.model.js";

const createDiaryEntry = async (req, res) => {
    try {
        const { title, content, mood, tags, date } = req.body;

        if (!req.user)
            return res.json({ status: 401, error: "Authentication required" })

        if (!title)
            return res.json({ status: 404, error: "Missing title" })

        if (!content)
            return res.json({ status: 404, error: "Missing content" })

        if (!date)
            return res.json({ status: 404, error: "Missing date" })

        const newDiaryEntry = await Diary.create({
            title,
            content,
            mood,
            tags,
            date,
            userId: req.user.userId
        })

        return res.json({ status: 201, message: "Diary entry created successfully", newDiaryEntry })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const editDiaryEntry = async (req, res) => {
    try {
        const { diaryEntryId } = req.body;

        if (!diaryEntryId)
            return res.json({ status: 404, error: "Missing diary entry id" })

        const diaryEntry = await Diary.findById(diaryEntryId);

        if (!diaryEntry)
            return res.json({ status: 404, error: "Diary entry not found" })

        const body = req.body;

        diaryEntry.title = body.title || diaryEntry.title;
        diaryEntry.content = body.content || diaryEntry.content;
        diaryEntry.mood = body.mood || diaryEntry.mood;
        diaryEntry.tags = body.tags || diaryEntry.tags;
        diaryEntry.date = body.date || diaryEntry.date;

        await diaryEntry.save();

        return res.json({ status: 200, message: "Diary entry updated successfully", diaryEntry })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const deleteDiaryEntry = async (req, res) => {
    try {
        const { diaryEntryId } = req.body;

        if (!diaryEntryId)
            return res.json({ status: 404, error: "Missing diary entry id" })

        const diaryEntry = await Diary.findByIdAndDelete(diaryEntryId);

        if (!diaryEntry)
            return res.json({ status: 404, error: "Diary entry not found" })

        return res.json({ status: 200, message: "Diary entry deleted successfully", diaryEntry })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const getAllDiaryEntries = async (req, res) => {
    try {
        const diaryEntries = await Diary.find({ userId: req.user.userId });

        if (!diaryEntries)
            return res.json({ status: 404, error: "Diary entries not found" })

        return res.json({ status: 200, message: "Diary entries fetched successfully", diaryEntries })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

export { createDiaryEntry, editDiaryEntry, getAllDiaryEntries, deleteDiaryEntry };