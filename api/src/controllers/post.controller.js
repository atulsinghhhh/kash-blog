import { Post } from "../models/post.model.js";

export const createPost=async(req,res)=>{
    try {
        const {title,content,type,tags}=req.body

        const newpost=await Post.create({
            title,
            content,
            type,
            tags,
            author: req.user._id
        })

        return res.status(201).json({
            success: true,
            message :"user successfully created post",
            newpost
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to created new post"
        })
    }
}

export const getAllPosts=async(req,res)=>{
    try {
        const posts=await Post.find()
            .populate("author" ,"username avatar")
            .sort({createdAt: -1})

        return res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "fetch all the posts"
        })
    }
}

export const getSinglePostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "username avatar");

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch post"
        });
    }
};


export const getPostById=async(req,res)=>{
    try {
        const userId = req.params.id;

        const posts = await Post.find({ author: userId })
            .populate("author", "username avatar");

        res.status(200).json({
            success: true,
            message: "Fetched user posts successfully",
            posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user posts"
        });
    }
}

export const getAllTags = async (req, res) => {
    try {
        const tags = await Post.distinct("tags"); // gets all unique tags
        res.status(200).json({
            success: true,
            tags
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tags"
        });
    }
};


export const removePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this post"
            });
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({
            success: true,
            message: "Post successfully deleted"
        });
    } catch (error) {
        console.error("Error in removePost:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete the post"
        });
    }
};


export const updatePost = async (req, res) => {
    try {
        const { title, content, type, tags } = req.body;

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content, type, tags },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, post: updated });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ success: false, message: "Failed to update post" });
    }
};
