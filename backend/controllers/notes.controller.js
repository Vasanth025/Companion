import Note from "../models/notes.model.js";

const createNote = async (req, res) => {
    try {
        const { title, description, userId, category } = req.body;

        if (!title) {
            return res.json({ status: 404, error: "Missing title" })
        }

        const newNote = await Note.create({
            title,
            description,
            userId,
            category
        })

        return res.json({ status: 201, message: "Note created successfully", newNote })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const getNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await Note.find({ userId });

        if (!notes) {
            return res.json({ status: 404, error: "Notes not found" })
        }

        return res.json({ status: 200, message: "Notes fetched successfully", notes })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const editNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findById(noteId);

        if (!note) {
            return res.json({ status: 404, error: "Note not found" })
        }

        const body = req.body;

        note.title = body.title || note.title;
        note.description = body.description || note.description;
        note.category = body.category || note.category;
        note.isPinned = body.isPinned || note.isPinned;

        await note.save();

        return res.json({ status: 200, message: "Note updated successfully", note })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findByIdAndDelete(noteId);

        if (!note) {
            return res.json({ status: 404, error: "Note not found" })
        }

        return res.json({ status: 200, message: "Note deleted successfully", note })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

export { createNote, getNote, editNote, deleteNote };
