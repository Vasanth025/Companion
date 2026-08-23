import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    todoName: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    finishedDate: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    priority: {
        type: String,
        enum: ['High', 'Low', 'Medium', 'Urgent', 'Normal'],
        default: 'Normal'
    },
    isPinned: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;