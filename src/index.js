// index.js
import dotenv from "dotenv"; 
dotenv.config({ path: ".env" });  

import { DBConnection } from "./db/index.js";
import { app } from "./app.js"; // Import the configured app 
 
DBConnection()
  .then(() => {
    const port = process.env.PORT || 8000; 
    app.on("error", (error) => {
      console.log(`Express error: `, error); // database connected but some other error like server/express error
    }); 
    app.listen(port, () => {
      console.log(`The port is listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB connection error: `, error); // database connection error
  }); 
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
        console.log("MongoDB connection Error: ",error)
        throw error;
    }
})()
*/
