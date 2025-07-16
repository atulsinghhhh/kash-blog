import Router from "express"
import {Post} from "../models/post.model.js";
import {User} from "../models/users.model.js";


const router=Router();

router.get("/", async (req, res) => {
    try {
        const query = req.query.query;
        const regex = new RegExp(query, "i"); 

        const posts = await Post.find({ 
            $or: [
                { title: regex },
                { content: regex },
                { tags: regex }
            ]
        }).populate("author", "username");

        const users = await User.find({ 
            $or: [
                { username: regex },
                { name: regex } 
            ]
        });

        res.json({ posts, users });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Search failed" 
        });
    }
});

export default router
