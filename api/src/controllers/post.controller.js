import { Post } from "../models/post.model.js";
import { User } from "../models/users.model.js";

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
        const posts = await Post.find()
            .populate("author", "username avatar")
            .sort({createdAt: -1});

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            posts: posts || []
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch posts"
        });
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
    const posts = await Post.find({ tags: { $exists: true, $ne: [] } });

    const allTags = [];

        posts.forEach(post => {
        post.tags.forEach(tagString => {
            const tags = tagString
            .replace(/,/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');

            allTags.push(...tags);
        });
        });

        const uniqueTags = Array.from(new Set(allTags.filter(Boolean)));

        const limit = parseInt(req.query.limit) || 10; // default to 10
        const limitedTags = uniqueTags.slice(0, limit);

        res.status(200).json({
        success: true,
        tags: limitedTags
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


export const getTopAuthors = async (req, res) => {
    try {
    const result = await Post.aggregate([
        { $group: { _id: "$author", postCount: { $sum: 1 } } },
        { $sort: { postCount: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: "users", 
                localField: "_id",
                foreignField: "_id",
                as: "authorDetails"
            }
        },
        { $unwind: "$authorDetails" },
        {
            $project: {
                username: "$authorDetails.username",
                avatar: "$authorDetails.avatar"
            }
        }
    ]);

    res.status(200).json({
        success: true,
        authors: result
    });
    } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Failed to fetch authors"
        });
    }
};

export const toggleLike = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
        return res.status(404).json({ 
                success: false,
                message: "Post not found" 
            });
        }

        if (!post.likes) {
            post.likes = [];
        }

        const isLiked = post.likes.includes(userId);

        if (isLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({
            success: true,
            message: isLiked ? "Post unliked" : "Post liked",
        });
    } catch (error) {
        console.error("Error in toggleLike:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
