const Twitter = require("twitter");

const Users = require("../models/users");

const client = require("./client");

module.exports = req => {
	client(req.body.user, twitter => {
		twitter.post(
			"statuses/update",
			{
				status: `${req.body.tweet} ${req.body.tags
					.map(item => (item = "#" + item.text))
					.join(" ")}`
			},
			(error, data, response) => {
				if (error) throw error;
				console.log(data); // Tweet body.
				// res.json({payload: data});
			}
		);
	});
};
