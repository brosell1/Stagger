const Twitter = require("twitter");
const path = require("path");
const fs = require("fs");

const Post = require("../models/posts");
const Users = require("../models/users");
const client = require("./client");

const uploadToTwitterAndPost = ({ user, text }, image) => {
	client(user, twitter => {
		console.log("TEXT***", text);
		twitter.post(
			"media/upload",
			{
				media: image
			},
			(err, data, response) => {
				if (err) {
					console.log("ERROR");
					return console.log(err);
				}
				twitter.post(
					"statuses/update",
					{
						status: text,
						media_ids: data.media_id_string
					},
					(err, data, response) => {
						if (err) {
							console.log("Error!");
							console.log(err);
						} else {
							console.log("Posted an image!");
						}
					}
				);
			}
		);
	});
};

module.exports = (body, file) => {
	console.log("BODY", body);
	if (!file) {
		let image_path = path.join(__dirname, "..", "uploads", body.media.id);
		return fs.readFile(image_path, (err, image) => {
			if (err) {
				return console.log(err);
			}
			return uploadToTwitterAndPost(body, image);
		});
	}
	let image_path = path.join(__dirname, "..", "..", file);
	return fs.readFile(image_path, (err, image) => {
		if (err) {
			return console.log(err);
		}
		return uploadToTwitterAndPost(body, image);
	});
};
