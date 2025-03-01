import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/users.model.js" // The User can directly contact with the database
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res) => { 
    // get user details from frontend
    // validation: like ensuring fields are not empty
    // check if user already exists: either unique email or username
    // check for images, check for avatar
    // if available upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const {fullName, email, username, password} = req.body /* Here the 'req.body' holds the parsed request body (parsed means that the data is converted into a suitable form for express (ex: raw data sent by the user is converted into json)). So, in this we have destructured the req.body into the following fields*/
    console.log("Email: ",email);
    

    if(
        [fullName,email,username,password].some((field) => // Ensuring that all the fields are filled
        field?.trim() === "")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }] // 
        // checks if either of the username or email are unique or not
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path; // This is called chaining

/*
req.files                   -> might be undefined if no files were uploaded.
req.files?.avatar           -> checks if req.files exists before trying to access avatar.
req.files?.avatar[0]        -> checks if avatar exists and has at least one file.
req.files?.avatar[0]?.path  -> finally gets the file path, only if everything before it is valid.
*/
    
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage = uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    await User.create({
        fullName,
        avatar: response.url,
        coverImage: response?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select( // removing the password and refreshToken from response
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

    }) // we passed this async function in asyncHandler. It extracts password, email, username, fullName from the request 
       // and prints the email

export {registerUser}       