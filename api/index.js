import "dotenv/config.js"
import express from "express";
import { connectToDatabase } from "./utils/connectionDB.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use("/api/v1/user/", userRouter);

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();