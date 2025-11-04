import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import uploadOnCloudinary from "../utilis/cloudinary.js"


export const userSignup=async(req,res)=>{
    try {
        const {username,email,password}=req.body

        if(!username || !email || !password){
            return res.status(401).json({
                success: false,
                message: "all fields are required"
            })
        }
        
        const existingUser=await User.findOne({
            $or:[
                {email},{username}
            ]
        })

        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "user is already existing"
            })
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            username,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "User is successfully signup",
            user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "user is failed to signup !!"
        })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",  
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({
            success: true,
            message: "User successfully logged in",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                avatar: user.avatar
            }
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again."
        });
    }
};

export const userLogout=async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure: false,
            sameSite: "Lax",  
            maxAge: 3600000 
        });

        res.status(200).json({
            success: true,
            message: "User successfully logout"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "user is failed to logout !!"
        })
    }
}

export const getProfile=async(req,res)=>{
    try {
        const userId=req.user._id
        const user=await User.findById(userId).select("-password")

        if(!user){
            return res.status(401).json({
                success:false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
}


export const updatedProfile=async(req,res)=>{
    try {
        const userId=req.user._id
        // console.log("userId:", req.user?._id);
        const {name,bios}=req.body


        // upload on cloudinary TODO
        let imageUrl=null
        if (req.files?.avatar?.[0]) {
            const avatarPath = req.files.avatar[0].path;
            // console.log("avatar path:", avatarPath);

            const image = await uploadOnCloudinary(avatarPath);
            // console.log(image);

            if (!image || !image.url) {
                return res.status(401).json({
                    success: false,
                    message: "Avatar failed to upload to Cloudinary"
                });
            }

            imageUrl = image.url;
        }
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                name, 
                bios, 
                ...(imageUrl && { avatar: imageUrl }) 
            },
            { new: true, runValidators: true }
        ).select("-password");

        res.status(201).json({
            success:true,
            message: "User successfully updated here profile",
            user:updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user failed to updated here profile"
        })
    }
}

export const followUnfollowUser=async(req,res)=>{
    try {
        const currentuserId=req.user._id;
        const targetUserId=req.params.id;

        if(currentuserId === targetUserId){
            return res.status(400).json({
                success: false,
                message: "You can't follow yourself"
            })
        }

        const currentUser=await User.findById(currentuserId);
        const targetUser=await User.findById(targetUserId);

        if(!targetUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isFollowing=currentUser.following.includes(targetUserId);

        if(isFollowing){
            currentUser.following.pull(targetUserId);
            targetUser.followers.pull(currentuserId);
        } else {
            currentUser.following.push(targetUserId);
            targetUser.followers.push(currentuserId);
        };
        

        await currentUser.save();
        await targetUser.save();

        return res.status(200).json({
            success: true,
            isFollowing: !isFollowing,
            message: isFollowing ? "unfollow" : "follow"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "follow error"
        })
    }
}

export const getFollowersAndFollowing=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
            .populate("followers", "username avatar")
            .populate("following", "username avatar")

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            followers: user.followers,
            following: user.following,
        })
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to fetch follow data"
        })
    }
}


export const getFollowData = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        .populate("followers", "username avatar")
        .populate("following", "username avatar");

        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            followers: user.followers,
            following: user.following,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        console.error('Error fetching user by id:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};



