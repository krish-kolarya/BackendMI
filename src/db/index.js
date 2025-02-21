import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const DBConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect (`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DB connected! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Database Connection Error: ", error);
        process.exit(1);
    } 
}