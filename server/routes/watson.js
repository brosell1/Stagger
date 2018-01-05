const express = require('express');
const router = express.Router();
const path = require('path');

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': "b93b683c-5d3f-4de2-92f3-b262ed38f400",
  'password': "ot0BNZeHTVmj",
  'version_date': "2017-02-27"
});

const Parameters = (body) => ({
  'text': body,
  'features': {
    'keywords': {
      'emotion': false,
      'sentiment': false,
      'limit': 5
    }
  }
});

router.get('/', (req, res) => {
  let params = new Parameters(req.body);
  natural_language_understanding.analyze(params, function(err, response) {
    if (err)
      console.log('error:', err);
    else
      res.json(response);
  });
});
