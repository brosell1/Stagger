const express = require('express');
const router = express.Router();
const path = require('path');
const Twitter = require('twitter');
const fs = require('fs');
const mongoose = require('mongoose');

const Post = require('../models/posts');

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

router.post('/schedule', (req, res) => {
  console.log(req.body);
  const { tweet, timeStamp, tags } = req.body;
  const params = {
    postContent: `${tweet} ${tags.map(item => item = "#" + item).join(" ")}`,
    scheduledTime: timeStamp
  }
  var post = new Post(params);
  post.save(() => {
    console.log('SAVED')
    res.json({message: 'ok'})
  })
})

module.exports = router;
