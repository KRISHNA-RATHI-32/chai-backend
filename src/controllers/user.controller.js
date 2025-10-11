// Importing the asyncHandler function from the utils folder
// asyncHandler is usually a higher-order function that helps handle errors
// in async route handlers without needing to use try-catch everywhere.
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse} from "../utils/ApiResponse.js";

// Defining an asynchronous route handler function called `registerUser`
// We wrap this function using `asynchandler()` so that if any error occurs inside it,
// the asyncHandler will catch the error and pass it to the Express error-handling middleware.
const registerUser = asyncHandler(async (req, res) => {

    // Inside this async function, we can write our registration logic.
    // For now, it just sends a JSON response with HTTP status 200 and message "ok".
    //sample below is for check
    // res.status(200).json({
    //     message: "ok"
    // });
    const {fullname,email,username,password}=req.body;
    console.log("email",email);
    // if(fullname==="" || email==="" || username==="" || password===""){
    //     res.status(400);
    //     throw new ApiError("All fields are mandatory");
    // }
    if([fullname,email,username,password].some((field)=>field?.trim()==="")){
        
        throw new ApiError(400,"All fields are mandatory");
    }
    //how to check if user already exists
    //first import user model.js
   const existedUser= await User.findOne({
        $or:[
            { email},
            { username}
        ]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists with this email or username");
    }
    console.log("req.files",req.files);
    console.log("req.files.avatar",req.files?.avatar);//now how to check this go to postman and check in body formdata
    //now checking images and avatar
    //middleware provides us some more fields in req object
    const avatarLocalPath=req.files?.avatar[0]?.path;//we require first property as it is an array, path is the location where it is stored by the multer 
    // const coverImageLocalPath=req.files?.coverImage[0]?.path;//if we do not pass cover imaage it will give error so we have to handle it by using if else conditions (optional chaining)
    let coverImageLocalPath;
    if(req.files&& Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;

    }
    
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
    } 
    //now we have to upload this image to cloudinary
    //we have to make a function for this in utils folder
    //importing uploadOnCloudinary function from utils/cloudinary.js
    const avatar= await uploadOnCloudinary(avatarLocalPath);//100% this will take time 
    
    const coverImage= await coverImageLocalPath?uploadOnCloudinary(coverImageLocalPath):null;
    if(!avatar){
        throw new ApiError(500,"Error while uploading avatar image");
    }
    //now we have to create user object and save it to db by using user .create() method which is provided by mongoose
    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })
    //if user is successfully created then mongodb by default adds some fields to it like _id,createdAt,updatedAt with every entry 

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while creating user");
    }
    //now we have to send success response to frontend as api response
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User created successfully")
    )
    
    
    
    //how to register user will be implemented here
    //get user details from frontend we can do it by postman
    //validation for data-(not all empty)
    //check if user already exists in db we can do this by checkin email or username
    //check for images,check for avatar if available upload it to cloudinary also then check if properly uploaded 
    //create user object -create entry in db
    //remove password and refresh token field from response
    //check for user creation success 
    //return success response to frontend
});

// Exporting registerUser (not shown here, but usually you’d do something like: export { registerUser })
// so it can be used in your routes file.
// where i have delclared req.body ? 
export {registerUser};