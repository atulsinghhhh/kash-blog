import jwt from "jsonwebtoken"
import { User } from "../models/users.model.js";

const verifyjwt=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded?._id){
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        const user=await User.findById(decoded?._id).select("-password");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is missing"
            })
        }

        req.user=user;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false,
            message: "Unauthorized" 
        });
    }
}

export default verifyjwt