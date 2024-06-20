import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./utils/connectionDB.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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