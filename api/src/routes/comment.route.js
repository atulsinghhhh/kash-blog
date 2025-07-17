import Router from "express"
import verifyjwt from "../middleware/auth.middleware.js";
import { addComment, getCommentsForPost } from "../controllers/comment.controller.js";

const router =Router();

router.post("/add",verifyjwt,addComment);
router.get("/post/:id",verifyjwt,getCommentsForPost)



export default router