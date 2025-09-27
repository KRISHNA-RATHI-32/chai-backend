import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
//we use cookieParser to access cookies of user and apply CRUD operations


const app=express()
app.use( cors({
    origin:process.env.CORS_ORIGIN,
    Credentials:true
}))//used for all middlewares and configurations
//for input from user we have to do below settings
app.use(express.json({limit:"16kb"}))
//in older days we have to use body parser as express is not easily compatible for json
//url se ane wala data isme ye encoded hota hai to configuration karnipadegi ,files handle karne ke liye hum multer use karte hai
app.use(express.urlencoded({extended:true,limit:"16kb"}))//extended means that we can take multiple objects at multiple levels
app.use(express.static("public"))//we do this to store file or image temporarily in our 
app.use(cookieParser())
   
export{app}//to export
//************************************************************ */
// function of middleware see in the cop