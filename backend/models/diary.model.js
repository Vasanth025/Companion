import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    mood: {
        type: String,
        enum: ['Happy', 'Sad', 'Neutral', 'Angry', 'Fearful', 'Surprised'],
        default: 'Neutral'
    },
    tags: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
})

diarySchema.index({ userId: 1, date: 1 }, { unique: true });

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;
