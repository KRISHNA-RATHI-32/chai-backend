//this gives local file path to cloudinary that we want to upload from server till our work is done and then we remove this file
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({ 
  cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
  api_key: 'process.env.CLOUDINARY_API_KEY', 
  api_secret: 'process.env.CLOUDINARY_API_SECRET'
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
  console.log("file uploaded successfully",response.url);
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
cloudinary.v2.uploader
  .upload("/home/my_image.jpg")
  .then(result => console.log(result))
  .catch(error => console.error(error));
export {uploadOnCloudinary}