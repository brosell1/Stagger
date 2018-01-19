const NLP = require("watson-developer-cloud/natural-language-understanding/v1.js");

const natural_language_understanding = new NLP({
	username: "b93b683c-5d3f-4de2-92f3-b262ed38f400",
	password: "ot0BNZeHTVmj",
	version_date: "2017-02-27"
});

function extractParams(req) {
	const query = req.query;
	return {
		text: query.text,
		features: {
			keywords: {
				emotion: false,
				sentiment: false,
				limit: Number(query.limit) || 10
			}
		}
	};
}

const generateTags = (params, success, error) => {
	natural_language_understanding.analyze(params, function(err, response) {
		if (err) {
			console.log("error:", err);
			return error(err);
		}

		console.log(JSON.stringify(response, null, 2));
		return success(response);
	});
};

const generateTagsFromRequest = (req, success, error) => {
	const params = extractParams(req);
	return generateTags(params, success, error);
};

module.exports = {
	generateTags,
	generateTagsFromRequest
};
