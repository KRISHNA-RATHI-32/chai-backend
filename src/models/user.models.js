// https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj
// above link is for models

import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,//cloudinary url used
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String,
    }


},{
    timestamps:true
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    this.password=await bcrypt.hash(this.password,10)//hash is a method which is used to encrypt and 10 which we have passed are the number of rounds associated with it 
    next()
    //whenever the data is saved its password is changed so this but this will create problem as it may change many times so we have to make a condition that the password is only changed when we changed the password or newly added this
})
//now we are going to make some method that crosschecks user input by asking user about it 
//mongoose gives us the options for this
userSchema.methods.passwordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
//what will jwt do the things are genrally seen in .env file

userSchema.methods.generateAccessToken=function(){
   return jwt.sign({
        //payloads
        _id:this_id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    }),
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign({
        //payloads
        _id:this._id,
       //this have less information
    }),
    process.env.REFRESH_TOKEN_SECRET,
    {
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }



}
//both are same but they differ by the usage

export const User=mongoose.model("User",userSchema);
     //this can directly contact to database as it is connected to mongoose 


