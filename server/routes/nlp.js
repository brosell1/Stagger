const express = require("express");
const router = express.Router();
const path = require("path");

const Watson = require("../libs/watson.js");

router.get("/", (req, res) => {
	Watson.generateTagsFromRequest(
		req,
		response => res.json({ payload: response }),
		err => res.json({ error: err })
	);
});

module.exports = router;
