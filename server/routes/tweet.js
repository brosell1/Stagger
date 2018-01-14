const express = require('express');
const router = express.Router();
const path = require('path');
const Twitter = require('twitter');
const fs = require('fs');
const mongoose = require('mongoose');

const Post = require('../models/posts');
const Users = require('../models/users');

const client = new Twitter({
  consumer_key: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumer_secret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  access_token_key: "913679354479235072-0YDP3OAbboL8OzsuJdC4VnR9AyQXAFK",
  access_token_secret: "Hgg6C6k2ZWGmZlFq4qurBaibkoIdWlaJclMVv9mTgA3eM"
});

const postExt = (req) => {
  Users.findOne({ twitterUsername: req.body.user }, (err, user) => {
    console.log(user);
    let clientExt = new Twitter({consumer_key: 'FFnMP0rI6pscDaXlbwPa4oCLp', consumer_secret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o', access_token_key: user._doc.twitterToken, access_token_secret: user._doc.twitterTokenSecret})
    console.log(clientExt)
    clientExt.post('statuses/update', {
      status: `${req.body.tweet} ${req.body.tags.map(item => item = "#" + item).join(" ")}`
    }, (error, data, response) => {
      if (error)
        throw error;
      console.log(data); // Tweet body.
      // res.json({payload: data});
    });
  });
};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("You've gone to the wrong place.");
});

router.get('/getQueue', (req, res, next) => {
  Post.find({ posted: false, accountsToPostTo: req.query.user }, (err, posts) => res.json(posts));
})

router.post('/text', (req, res) => {
  postExt(req);
});

router.post('/schedule', (req, res) => {
  console.log(req.body);
  const { tweet, timeStamp, tags, user } = req.body;
  const params = {
    postContent: `${tweet} ${tags.map(item => item = "#" + item).join(" ")}`,
    scheduledTime: timeStamp,
    accountsToPostTo: user
  }
  var post = new Post(params);
  post.save(() => {
    console.log('SAVED')
    res.json({message: 'ok'})
  })
})

module.exports = router;
