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

// router.post('media/pic', (req, res) => {

  function uploadImage(){

    console.log('Opening an image...');

    var image_path = path.join(__dirname, '/ar15.jpg'),
        b64content = fs.readFileSync(image_path, { encoding: 'base64' });

    console.log('Uploading an image...');


    client.post('media/upload', { media_data: b64content }, function (err, data, response) {
      if (err){
        console.log('ERROR');
        console.log(err);
      }
      else{
        console.log('Uploaded an image!');

    client.post('statuses/update', {
        media_ids: new Array(data.media_id_string)
      },
        function(err, data, response) {
          if (err){
            console.log('Error!');
            console.log(err);
          }
          else{
            console.log('Posted an image!');
          }
        }
      );
    }
  });
}

// });


module.exports = router;