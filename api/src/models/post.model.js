import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ],

    type: { 
        type: String, 
        enum: ['blog', 'poetry', 'activity', 'code'], 
        default: 'blog' 
    },
    tags: [String]

},{timestamps:true})

export const Post=mongoose.model("Post",postSchema)