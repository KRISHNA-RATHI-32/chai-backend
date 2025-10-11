//this gives local file path to cloudinary that we want to upload from server till our work is done and then we remove this file
import { v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //this is present in file name
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
//we make a method to upload on cloudinary because w will use it in multiple places
const uploadOnCloudinary=async(localFilePath)=>{
try{
  if(!localFilePath)return null;
  //uploading image to cloudinary
  const response=await cloudinary.uploader.upload(localFilePath,{
    resource_type:"auto"
  })
  //file uploaded successfully
  console.log("")
  console.log("file uploaded successfully",response.url);
  console.log("request",response);
  fs.unlinkSync(localFilePath)//removing the file from local storage as it is uploaded to cloudinary
  return response;

}
catch(error){
  //if file is not successfully uploaded or there is some error
  console.log("error while uploading on cloudinary",error);
  fs.unlinkSync(localFilePath)//removing the file from local storage if there is some error 
  return null;

}
}
//upload image to cloudinary  
// cloudinary.uploader
//   .upload("/home/my_image.jpg")
//   .then(result => console.log(result))
//   .catch(error => console.error(error));
//the above will create problem as the files are not added initiall but the above test code will run at the time of server startup
//so we have to make a function for this and call it whenever we want to upload image to cloudinary
//we will use this function in user controller while registering user
//we will also use this function in post controller while creating post
export {uploadOnCloudinary}