const Twitter = require("twitter");

const Users = require("../models/users");

module.exports = (username, cb) => {
	return Users.findOne({ twitterUsername: username }, (err, user) => {
		const client = new Twitter({
			consumer_key: "FFnMP0rI6pscDaXlbwPa4oCLp",
			consumer_secret: "vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o",
			access_token_key: user._doc.twitterToken,
			access_token_secret: user._doc.twitterTokenSecret
		});
		return cb(client);
	});
};
