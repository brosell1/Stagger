var express = require('express');
var router = express.Router();
var path = require('path');
var Twit = require('twit');
var fs = require('fs');

var T = new Twit({
  consumer_key:         'UhOzvOrUNmsqKZDLoBIaxyZsd',
  consumer_secret:      'vqNf523ksiozXXfmW5ZbpX3ToGQoUpvEWMhWdjAa4BiVAbrWes',
  access_token:         '937705103959740416-nhtYwRpoVhFJV8z9SxtoObtJ8Z2pBKm',
  access_token_secret:  '002FMPPh9ufJvBy63EdcgMF4vWla2ZLRfDtxYdSCEbF7L',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You've gone to the wrong place.");
});

router.post('/text', function(req, res) {
  T.post('statuses/update', { status: req.body.tweet }, (err, data, response) => {
    console.log("Sent a text tweet");
    res.json({payload: data})
  })
});

router.post('/media', function(req, res) {
    T.postMediaChunked({ file_path: req.body.media }, function (err, data, response) {
      console.log(data)
      res.json({payload: data})
    })
});

module.exports = router;
