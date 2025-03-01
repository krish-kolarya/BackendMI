import multer from "multer";

const storage = multer.diskStorage({
    //destination is a field which tells us where the files are to be uploaded
    destination: function(req,file,cb){ // multer here in this line provides the file parameter
        cb(null,"./public/temp")
    },
    //filename is responsible for providing the proper name of the file, it is recommended to add a unique combination just before the extension (like sunset-93j8304.jpg or krishna-je8D98.png)
    filename: function(req,file,cb){
        cb(null,file.originalname) //(recommend)change here at the end
    }
})

 const upload = multer({
    storage, //storage: storage (when key and value are same use this shorthand)
})

export default upload