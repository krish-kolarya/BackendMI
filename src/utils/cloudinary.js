/*Standard Approach:

User Uploads a File: The user submits a file through a form.

Multer Handles the Upload: Multer processes the incoming file and stores it temporarily on the server's local storage.

Upload to Cloudinary: The server retrieves the file from local storage and uploads it to Cloudinary.*/

// We are assuming that a file has been provided to us,
// and we are given the path to its local storage location

import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // read,write files and many other methods

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary ",response.url);
        return response;
    } catch(error){
        fs.unlinkSync(localFilePath) //If the file was not uploaded, we clean the server by deleting(unlinking) the files
        return null;  
    }
}

export {uploadOnCloudinary}