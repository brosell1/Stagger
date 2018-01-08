const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': "b93b683c-5d3f-4de2-92f3-b262ed38f400",
  'password': "ot0BNZeHTVmj",
  'version_date': "2017-02-27"
});

const parameters = {
  'text': 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.',
  'features': {
    'entities': {
      'emotion': false,
      'sentiment': false,
      'limit': 5
    },
    'keywords': {
      'emotion': false,
      'sentiment': false,
      'limit': 5
    }
  }
}

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
