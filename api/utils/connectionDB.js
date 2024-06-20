import mongoose from "mongoose";

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.error(error);
    }
}