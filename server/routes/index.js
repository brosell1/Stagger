var express = require('express');
var router = express.Router();
var path = require('path');
var Twit = require('twit')

var T = new Twit({
  consumer_key:         'UhOzvOrUNmsqKZDLoBIaxyZsd',
  consumer_secret:      'vqNf523ksiozXXfmW5ZbpX3ToGQoUpvEWMhWdjAa4BiVAbrWes',
  access_token:         '937705103959740416-nhtYwRpoVhFJV8z9SxtoObtJ8Z2pBKm',
  access_token_secret:  '002FMPPh9ufJvBy63EdcgMF4vWla2ZLRfDtxYdSCEbF7L',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + '../../../test/twit.html'));
});

router.post('/', function(req, res) {
  T.post('statuses/update', { status: req.body.value }, function(err, data, response) {
    console.log(data.status);
    res.json({payload: data})
  })
});

module.exports = router;
