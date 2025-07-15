import Router from "express"
import {Post} from "../models/post.model.js";
import {User} from "../models/users.model.js";


const router=Router();

router.get("/", async (req, res) => {
    try {
        const query = req.query.query;
        const regex = new RegExp(query, "i"); // case-insensitive

        const posts = await Post.find({ 
        $or: [
            { title: regex },
            { content: regex },
            { tags: regex }
        ]
        }).populate("author", "username");

        const users = await User.find({ username: regex });

        res.json({ posts, users });
    } catch (error) {
        res.status(500).json({ message: "Search failed" });
    }
});

export default router
