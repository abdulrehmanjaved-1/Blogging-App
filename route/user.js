const express=require("express");
const router=express.Router();
const {new_user_signup,user_login,user_logout}=require("../controller/user");
const { user_addblog } = require("../controller/blog");

router.post('/dashboard',new_user_signup)
router.post('/login',user_login)
router.get('/logout',user_logout)
router.post('/addblog',user_addblog)

module.exports=router;