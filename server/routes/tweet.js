const express = require("express");
const router = express.Router();
const Twitter = require("twitter");
var multer = require("multer");
var upload = multer({ dest: "server/uploads/" });

const Post = require("../models/posts");

const media = require("../libs/media");
const postExt = require("../libs/postExt");

/* GET home page. */
router.get("/", function(req, res, next) {
	res.send("You've gone to the wrong place.");
});

router.get("/getQueue", (req, res, next) => {
	Post.find({ posted: false, accountsToPostTo: req.query.user }, (err, posts) =>
		res.json(posts)
	);
});

router.post("/text", (req, res) => {
	postExt(req);
});

router.post("/media", upload.single("media"), (req, res) => {
	console.log("request: ", req.body);
	console.log("request: ", req.file);
	if (req.file) {
		media(req.body, req.file.path);
	} else {
		media(req.body);
	}
});

router.post("/schedule", (req, res) => {
	console.log(req.body);
	const { tweet, timeStamp, tags, user } = req.body;
	const params = {
		postContent: `${tweet} ${tags
			.map(item => (item = "#" + item.text))
			.join(" ")}`,
		scheduledTime: timeStamp,
		accountsToPostTo: user
	};
	var post = new Post(params);
	post.save(() => {
		console.log("SAVED");
		res.json({ message: "ok" });
	});
});

module.exports = router;
