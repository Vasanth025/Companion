import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['Ordinary', 'CompAdmin'],
        default: 'Ordinary'
    },
    password: {
        type: String,
        required: true,
    },
    streak: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
