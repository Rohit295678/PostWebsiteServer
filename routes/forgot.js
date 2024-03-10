const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer");
const bcrypt = require("bcrypt");

router.post('/',async(req,res)=>{
     try {
        const user = await User.findOne({ email: req.body.emailForgot });
        if(!user){
            return res.status(401).send({ message: "User does not exist" })
        }
        const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/reset/${token.token}`;
		await sendEmail(user.email, "Reset Password", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
        
     } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
     }
});

router.post("/:id/reset/:token",async(req,res)=>{
    try {
        const user = await User.findOne({_id: req.params.id});
        if (!user) return res.status(400).send({ message: "Invalid link" });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

        const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });
		await User.findOneAndUpdate({ _id: user._id},{ password: hashPassword });
		await Token.findByIdAndDelete({_id: token._id})
		res.status(200).send({ message: "Password Update SuccessFully" });
        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router;