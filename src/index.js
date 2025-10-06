// require('dotenv').config({path:"./env"})//this is valid but it breaks the consistency of the code
import app from "./app.js"//importing app from app.js
//if we do like this it will give error because import export is not supported in node js directly to avoid this we use type module in package.json
//path:"./env" tells about the path of the .env file
import dotenv from "dotenv"//we can do like this to avoid the above
// import mongoose from "mongoose"
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})

//approach 2 alag folder ke file me code likhke import karke execute kade
//make file in index.js in db folder in src
//but only this will not work
//dotenv :-as early as possible import and configure dotenv do it on top
connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is runing at port:${process.env.PORT}`)
    })                            
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ",err);
})



























/*import express from "express"
const app=express()//app has listners in it by express
;(async()=>{
   try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);//connection of DB 
    // Listens for error events emitted by the server.
    app.on("error",()=>{console.log("ERROR:",error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
   }
   catch(error){
    console.log("ERROR",error);
   } 
})()
*/