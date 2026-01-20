import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

import { connectDB } from "../src/config/db.js";
import ciselRoutes from "../src/routes/ciselRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";
import rateLimiter from "../src/middleware/rateLimiter.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6767;
// const __dirname = path.resolve()

const allowedOrigin = process.env.NODE_ENV === "production" 
    ? "https://p3lbackend.vercel.app"  // URL asli saat sudah live
    : "http://localhost:5173";        // URL saat coding (development)

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true
    })
);


// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(cookieParser())

app.use("/api/sdncs1/", ciselRoutes);
app.use("/api/auth/", authRoutes);

// kalo di sisi production :
// if (process.env.NODE_ENV === "production") {
//     //deploy
//     app.use(express.static(path.join(__dirname,"../../frontend/dist")))
//     // artinya : naik ke root, cari dist, serve dist sebagai aset static

//     // kalo ada request get ke route selain di notesRoutes, kasih index.html punya FE :
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
//     })
// }

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log("Server started on PORT : ", PORT);
    });
}); 
