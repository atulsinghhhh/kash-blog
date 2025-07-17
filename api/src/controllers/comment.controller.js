import { Comment } from "../models/comment.model.js";


export const addComment = async (req, res) => {
    try {
        const { content, postId } = req.body;

        if (!content || content.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Comment content cannot be empty"
            });
        }

        const comment = new Comment({
            content: content.trim(),
            author: req.user._id,
            post: postId
        });

        await comment.save();

        return res.status(200).json({
            success: true,
            message: "Comment added",
            comment
        });

    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const getCommentsForPost = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate("author", "username");

        return res.status(200).json({ 
            success: true, 
            comments
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching comments"
        });
    }
};
