const express = require("express");
const router = express.Router();
const path = require("path");
const download = require("download-file");

const GphApiClient = require("giphy-js-sdk-core");

const client = GphApiClient("jbGVfrZuIZiFl6KNg9XIthdKDNc0YaTW");

router.get("/", (req, res) => {
	client
		.search("gifs", {
			fmt: "json",
			q: req.query.keyword,
			limit: 1,
			rating: "pg-13",
			sort: "relevant"
		})
		.then(response => {
			const gifObject = response.data[0];
			console.log(gifObject);
			const options = {
				directory: "./server/uploads",
				filename: gifObject.images.fixed_height.media_id
			};
			download(gifObject.images.fixed_height.gif_url, options, err =>
				console.log("DL ERR:", err)
			);
			return res.json({
				payload: {
					id: gifObject.images.fixed_height.media_id,
					url: gifObject.images.fixed_height.gif_url
				}
			});
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;
