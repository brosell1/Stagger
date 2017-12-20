var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var Twitter = require('twitter');

var n = 7;

mongoose.connect('mongodb://localhost/cronTest', {useMongoClient: true});

mongoose.connection.once('open', function() {
  console.log('Connected to database!');
});

mongoose.connection.on('error', function(err) {
  console.error('Could not connect to database!', err);
})

var schema = new mongoose.Schema({body: String, date: Number, posted: Boolean});

var Posts = mongoose.model('posts_copy', schema, 'posts_copy');

const client = new Twitter({consumer_key: 'FFnMP0rI6pscDaXlbwPa4oCLp', consumer_secret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o', access_token_key: '937705103959740416-rFYq9iQliFIKk8VofgIThEjPcoYEL8D', access_token_secret: 'PAp1jV228XEYZV5WrIhQZEzRgUjpsZSNxnSN6GiRmTTsT'});

var job = new CronJob('0 * * * * *', () => {
  console.log('You will see this message every minute');
  Posts.find({
    posted: false,
    date: {$lte: Date.now()}
  }, (err, posts) => {
    console.log(posts);
    if (err)
      throw err;
    if (!posts || posts.length == 0)
      return;
    posts.map(post => {
      client.post('statuses/update', {
        status: `${post.body}`
      }, (error, data, response) => {
        if (error)
          throw error;
        console.log(data); // Tweet body.
        post.posted = true;
        post.save((err, item) => {
          if (err)
            throw err;
          console.log('Posted', item);
        })
        // res.json({payload: data});
      });
    });
  });
}, null, false, 'Europe/Dublin');

// var job = new CronJob('*/10 * * * * *', () => {
//   console.log('You will see this message every ten seconds');
//   Posts.findOneAndUpdate({posted: false}, {$set:{posted: true}}, (err, post) => {
//     console.log(post);
//     if(err) throw err;
//     if(!post) return;
//     client.post('statuses/update', {status: `${post.body}`}, (error, data, response) => {
//       if(error) throw error;
//       console.log(data);   Tweet body.
//        res.json({payload: data});
//     });
//   });
// }, null, false, 'Europe/Dublin');

job.start();
