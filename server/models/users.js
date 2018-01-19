const mongoose = require('mongoose');

const userSchema = {
  twitterName: String,
  twitterUsername: String,
  twitterToken: String,
  twitterTokenSecret: String
}

var User = mongoose.model('users', mongoose.Schema(userSchema));

module.exports = User;
