import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    //  //this will give unique name to the file
    cb(null, file.originalname)//original name of the file given by user
    //cb is defined in multer documentation 
  }
});

export const upload = multer({ storage: storage });
//we have used multer in files named user.routes.js and user.controller.js
//in user.routes.js we have used it as middleware to handle file upload
//in user.controller.js we have used it to get the file from req object and then upload it to cloudinary