// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
 
const app = express();
 
app.use(cors({ 
    origin: process.env.CORS_ORIGIN, 
    credentials: true 
}));

app.use(express.json({ limit: "16kb" })); 
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())

// Import routes
import userRouter from "./routes/user.route.js"; // adjust path as needed

// Use routes with prefix
app.use("/api/v1/users", userRouter); 
// Since we have seperated the router and middleware we will not use 
// app.get(router ex: '/about',middleware ex: (req,res) => {res.send("Hello")}).
// Rather we will use a middleware to connect both of these. So, we use app.use(route,middleware).

export { app };


/*
Yes, userRouter is being used as a middleware in your Express app.

Why is it a middleware?
In Express, middleware is any function that processes requests before they reach the final route handler.

Here’s what happens when app.use("/api/v1/users", userRouter); is executed:

userRouter is imported from user.route.js, where it defines routes (/register, etc.).

app.use("/api/v1/users", userRouter); tells Express:
Any request to /api/v1/users/* should be handled by userRouter.

For example, a POST request to /api/v1/users/register will be handled by userRouter.

Final Answer:
✅ Yes, userRouter is middleware because it intercepts requests to /api/v1/users/* and directs them to the appropriate route handler. 
*/