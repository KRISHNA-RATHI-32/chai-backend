import mongoose, { Schema } from "mongoose";
import mongooseAgrregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema=new Schema({
    videoFile:{
        type:String,//by cloudnary url
        required:true,
    },
    thumbnail:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{//it is not given by user it comes from number format by cloudnary
        type:String,
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
})
videoSchema.plugin(mongooseAgrregatePaginate)
export const Video=mongoose.model("Video",videoSchema)