import express from 'express';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import notesRoutes from './routes/notes.routes.js';
import todoRoutes from './routes/todo.routes.js';
import diaryRoutes from './routes/diary.routes.js';

configDotenv();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/diary", diaryRoutes);

app.get("/", (req, res) => {
    res.send("Server is Running")
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

app.listen(process.env.PORT, () => { console.log(`Server is running in port ${process.env.PORT}`) })