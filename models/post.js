const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId:{type: String, required: true, unique: true},
	name: {
		type: String,
		required: true,
	},
    img: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
	createdAt: { type: String },
});

const Posts = mongoose.model("post", postSchema);

module.exports = {Posts}