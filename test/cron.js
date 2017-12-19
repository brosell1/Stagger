var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var Twitter = require('twitter');

var n = 1;

mongoose.connect('mongodb://BenFruit:Bootcamp@ds135946.mlab.com:35946/angry-eyes', { useMongoClient: true });

var schema = new mongoose.Schema({ body: 'string' });
var Post = mongoose.model('cronTest', schema);

const client = new Twitter({
  consumer_key: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumer_secret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  access_token_key: '937705103959740416-rFYq9iQliFIKk8VofgIThEjPcoYEL8D',
  access_token_secret: 'PAp1jV228XEYZV5WrIhQZEzRgUjpsZSNxnSN6GiRmTTsT'
});

new CronJob('*/10 * * * * *', function() {
  console.log('You will see this message every minute');
  /* vvv NOT WORKING vvv maybe try a different query to see if it's even looking at the database */
  Post.findOneAndRemove({body: ""}, (err, post) => {
    console.log(post);
    if(err) throw err;
    client.post('statuses/update', {status: post}, (error, data, response) => {
      if(error) throw error;
      console.log(data);  // Tweet body.
      // res.json({payload: data});
    });
  });
}, null, true, 'America/Los_Angeles');
