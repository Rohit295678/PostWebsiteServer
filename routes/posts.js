const router = require("express").Router();
const { User } = require("../models/user");
const { Posts } = require("../models/post")

router.get('/',async(req,res)=>{
    try {
        const posts = await Posts.find();
        res.json(posts)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;