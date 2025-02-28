// user.route.js
import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js"; 
import upload from "../middlewares/multer.middleware.js"; 

const router = Router(); 

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser);

// userRouter itself contains another middleware (upload.fields(...)), which processes file uploads before calling 
// registerUser.

export default router;
