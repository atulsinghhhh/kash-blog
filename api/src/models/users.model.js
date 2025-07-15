import mongoose,{Schema} from "mongoose"

const userSchema=Schema({
    username:{
        type: String,
        unique:true,
        required:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    name:{
        type: String,
    },
    avatar:{
        type:String
    },
    bios:{
        type:String
    }
},{timestamps:true});


export const User=mongoose.model("User",userSchema)