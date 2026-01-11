import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import ciselRoutes from "./routes/ciselRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6767;

if (process.env.NODE_ENV !== "production"){
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use("/api/sdncs1/", ciselRoutes);

connectDB().then(()=> {
    app.listen(6767, () => {
        console.log("Server started on PORT : ", PORT);
    });
}); 
