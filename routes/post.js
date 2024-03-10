const router = require("express").Router();
const { Posts } = require("../models/post")

router.get('/',async(req,res)=>{
    try {
        const postId = req.headers.id;
        if (!postId) {
            return res.status(400).json({ message: "PostId is missing from request headers" });
        }

        let post = await Posts.findOne({ _id: postId });
        if (!post) {
            return res.status(409).json({ message: "Post with given Id does not exist" });
        }
        res.json(post)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;