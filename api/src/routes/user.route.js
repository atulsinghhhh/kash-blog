import Router from "express"
import { followUnfollowUser, getFollowersAndFollowing, getProfile,  updatedProfile, userLogin, userLogout, userSignup } from "../controllers/user.controller.js";
import verifyjwt from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js"



const router= Router();

router.post("/signup",userSignup)
router.post("/login",userLogin)
router.post("/logout",userLogout)


router.get("/me",verifyjwt,getProfile)
router.patch("/update",verifyjwt,upload.fields([{
    name: "avatar",
    maxCount: 1
}]),updatedProfile)



router.put("/follow/:id",verifyjwt,followUnfollowUser)
router.get("/follow-stats/:id",verifyjwt,getFollowersAndFollowing);





export default router