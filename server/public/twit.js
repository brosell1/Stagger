var Twit = require('twit')

var T = new Twit({
  consumer_key:         'UhOzvOrUNmsqKZDLoBIaxyZsd',
  consumer_secret:      'vqNf523ksiozXXfmW5ZbpX3ToGQoUpvEWMhWdjAa4BiVAbrWes',
  access_token:         '937705103959740416-nhtYwRpoVhFJV8z9SxtoObtJ8Z2pBKm',
  access_token_secret:  '002FMPPh9ufJvBy63EdcgMF4vWla2ZLRfDtxYdSCEbF7L',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

function sendTweet() {
  T.post('statuses/update', { status: document.getElementById("tweet").value }, function(err, data, response) {
    console.log(data.status);
  })
}

document.addEventListener("submit", event => {
  event.preventDefault();
  T.post('statuses/update', { status: document.getElementById("tweet").value }, function(err, data, response) {
    console.log(data.status);
  })
})
