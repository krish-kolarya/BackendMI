// We are assuming that a file has been provided to us,
// and we are given the path to its local storage location

import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; // read,write files and many other methods

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});



cloudinary.v2.uploader.upload("https://res.cloudinary.com/dn8sokwat/image/upload/v1740094732/cld-sample-5.jpg",{public_id: "olympic_flag"},
    function(error, result) {console.log(result);});