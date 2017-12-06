require('dotenv').config();
var Twitter = require('twitter');

var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var appAuth = require('../../config.js');

var client = new Twitter({
  consumer_key: appAuth.consumer_key,
  consumer_secret: appAuth.consumer_secret,
  access_token_key: appAuth.access_token_key,
  access_token_secret: appAuth.access_token_secret
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You've gone to the wrong place.");
});

router.post('/text', function(req, res) {
  console.log(appAuth);
  client.post('statuses/update', { status: req.body.tweet }, (err, data, response) => {
    console.log("Sent a text tweet");
    res.json({payload: data})
  })
});

router.post('/media', function(req, res) {
    client.postMediaChunked({ file_path: req.body.media }, function (err, data, response) {
      console.log(data)
      res.json({payload: data})
    })
});

module.exports = router;
