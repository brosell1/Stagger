var express = require('express');
var router = express.Router();
var path = require('path');
var Twitter = require('twitter');
var fs = require('fs');

const client = new Twitter({
  consumer_key: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumer_secret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  access_token_key: '937705103959740416-rFYq9iQliFIKk8VofgIThEjPcoYEL8D',
  access_token_secret: 'PAp1jV228XEYZV5WrIhQZEzRgUjpsZSNxnSN6GiRmTTsT'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You've gone to the wrong place.");
});

router.post('/text', (req, res) => {
  client.post('statuses/update', {status: req.body.tweet}, (error, data, response) => {
      if(error) throw error;
      console.log(data);  // Tweet body.
      res.json({payload: data});
  });
});

// router.post('/media', function(req, res) {
//     T.postMediaChunked({ file_path: req.body.media }, function (err, data, response) {
//       console.log(data)
//       res.json({payload: data})
//     })
// });

module.exports = router;
