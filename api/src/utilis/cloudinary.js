import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


const uploadOnCloudinary=async(filepath)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });
    try {
        if(!filepath) return null;

        const uploadResult=await cloudinary.uploader.upload(filepath);
        fs.unlinkSync(filepath);
        return uploadResult
    } catch (error) {
        fs.unlinkSync(filepath);
        console.log(`failed to upload on cloudinary ${error.message}`);
        return null;
    }
}

export default uploadOnCloudinary