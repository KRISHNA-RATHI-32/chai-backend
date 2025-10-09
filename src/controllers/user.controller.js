// Importing the asyncHandler function from the utils folder
// asyncHandler is usually a higher-order function that helps handle errors
// in async route handlers without needing to use try-catch everywhere.
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";

// Defining an asynchronous route handler function called `registerUser`
// We wrap this function using `asynchandler()` so that if any error occurs inside it,
// the asyncHandler will catch the error and pass it to the Express error-handling middleware.
const registerUser = asyncHandler(async (req, res) => {

    // Inside this async function, we can write our registration logic.
    // For now, it just sends a JSON response with HTTP status 200 and message "ok".
    //sample below is for check
    res.status(200).json({
        message: "ok"
    });
    const {fullName,email,username,password}=req.body;
    console.log("email",email);
    // if(fullName==="" || email==="" || username==="" || password===""){
    //     res.status(400);
    //     throw new ApiError("All fields are mandatory");
    // }
    if([fullName,email,username,password].some((field)=>field?.trim()==="")){
        
        throw new ApiError(400,"All fields are mandatory");
    }
    //how to check if user already exists
    //first import user model.js
   const existedUser= User.findOne({
        $or:[
            { email},
            { username}
        ]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists with this email or username");
    }
    

    
    
    
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

export {registerUser};