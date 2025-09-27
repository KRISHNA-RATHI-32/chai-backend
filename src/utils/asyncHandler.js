const asyncHandler=(requestHandler)=>{
    //we will return asitis in promise format
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}



//we are using first with try catch





export{asyncHandler}

// const asyncHandler=()=>{}
// const asyncHandler=(func)=>{()=>{}}
// const asyncHandler=(func)=>async()=>{}

//second by promises
// higher order functions
//baiscally it is a wrapper function
// //this is for try catch block type
// const asyncHandler=(fn)=>async(req,res,next)=>{//note 
//     try{
//         await fn(req,res,next)
//     }catch(error){
//          //it is given for frontend developer for handling the error
//         res.status(error.code||500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }