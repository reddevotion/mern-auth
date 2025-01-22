import e from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const app = e();
const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(e.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(e.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message));



