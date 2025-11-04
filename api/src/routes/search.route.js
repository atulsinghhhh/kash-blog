import { Router } from "express";
import { Post } from "../models/post.model.js";
import { User } from "../models/users.model.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const query = req.query.query?.trim();
        if (!query) {
        return res.status(200).json({ posts: [], users: [] });
        }

        const regex = new RegExp(query, "i");

        // --- Search Posts ---
        const posts = await Post.find({
            $or: [
                { title: regex },
                { content: regex },
                { tags: regex },
            ],
            })
            .populate("author", "username avatar name")
            .sort({ createdAt: -1 });

        // --- Search Users ---
        const users = await User.find({
            $or: [{ username: regex }, { name: regex }],
        })
        .select("username name avatar bios followers following")
        .limit(20);

        return res.json({ posts, users });
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({
        success: false,
        message: "Search failed",
        error: error.message,
        });
    }
});

export default router;
