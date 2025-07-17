import Router from "express"
import { getProfile, getUserProfile, isFollowingByUsername, toggleFollow, updatedProfile, userLogin, userLogout, userSignup } from "../controllers/user.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js"
import { User } from "../models/users.model.js";


const router= Router();

router.post("/signup",userSignup)
router.post("/login",userLogin)
router.post("/logout",userLogout)


router.get("/me",verifyjwt,getProfile)
router.patch("/update",verifyjwt,upload.fields([{
    name: "avatar",
    maxCount: 1
}]),updatedProfile)

router.get("/profile/:username",getUserProfile)
router.get("is-following-by-username/:username",verifyjwt,isFollowingByUsername)




router.put("/follow/:id",verifyjwt,toggleFollow)
router.get("/is-following/:id", verifyjwt, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        const isFollowing = currentUser.following.includes(req.params.id);
        res.status(200).json({ isFollowing });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to check following" });
    }
});


export default router