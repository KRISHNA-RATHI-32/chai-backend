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
})

export const upload = multer({ storage })