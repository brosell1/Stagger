const express = require('express');
const router = express.Router();
const path = require('path');
// const Twitter = require('twitter');
// const fs = require('fs');
// const mongoose = require('mongoose');

const GphApiClient = require('giphy-js-sdk-core');

const client = GphApiClient("jbGVfrZuIZiFl6KNg9XIthdKDNc0YaTW");

// const Post = require('../models/posts');

// const client = new Twitter({
//   consumer_key: 'FFnMP0rI6pscDaXlbwPa4oCLp',
//   consumer_secret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
//   access_token_key: '937705103959740416-rFYq9iQliFIKk8VofgIThEjPcoYEL8D',
//   access_token_secret: 'PAp1jV228XEYZV5WrIhQZEzRgUjpsZSNxnSN6GiRmTTsT'
// });



router.get('/', (req, res) => {
  client.search('gifs', {fmt:"json", q: req.query.keyword, limit: 1, rating: "pg-13", sort: "relevant" })
    .then((response) => {
      response.data.forEach((gifObject) => {
        console.log(gifObject);
        res.send(`<img src=${gifObject.images.fixed_height.gif_url} />`);
      })
    })
    .catch((err) => {
        console.log(err);
    })
});


module.exports = router;
