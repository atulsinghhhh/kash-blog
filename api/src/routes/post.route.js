import Router from "express"
import { createPost, getAllPosts, getPostById, removePost, updatePost,getSinglePostById,  getAllTags } from "../controllers/post.controller.js"
import verifyjwt from "../middleware/auth.middleware.js"

const router=Router()

router.route("/")
    .get(getAllPosts)
    .post(verifyjwt,createPost)

router.get("/tags",getAllTags)

router.get("/user/:id",verifyjwt,getPostById)
router.get("/:id", getSinglePostById)


router.route("/:id")
    .put(verifyjwt,updatePost)
    .delete(verifyjwt,removePost)



export default router