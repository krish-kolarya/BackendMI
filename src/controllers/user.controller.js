import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/users.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req,res) => { 
    // get user details from frontend
    // validation
    // check if user already exists
    // check for images, check fro avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullName, email, username, password} = req.body
    console.log("Email: ",email);

    if(
        [fullName,email,username,password].some((field) =>
        field?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    User.findOne({
        $or: [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    }) // we passed this async function in asyncHandler. It extracts password, email, username, fullName from the request 
       // and prints the email

export {registerUser}       