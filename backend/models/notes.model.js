import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    category: {
        type: String,
        enum: ['Personal', 'Work', 'Others'],
        default: 'Others'
    },
    isPinned: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

const Note = mongoose.model("Note", noteSchema);

export default Note;
