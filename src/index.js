import dotenv from "dotenv";

import {DBConnection} from "./db/index.js";

dotenv.config({path : ".env"});

import express from "express"

const app = express()

DBConnection()
.then(() => {
    const port = process.env.PORT || 8000; 
    app.on("error", (error) => {
        console.log(`Express error: `, error);
    })
    app.listen(port, () => {
        console.log(`The port is listening on port: ${port}`);
    })
})
.catch((error) => {
    console.log(`MongoDB connection error: `,error);
    
})
/*
import express from "express";

const app = express()

;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Express error: ",error);
            throw error;
        })

        app.listen(process.env.PORT , () => {
            console.log(`App is listening on ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("Error: ",error)
        throw error;
    }
})()
*/
