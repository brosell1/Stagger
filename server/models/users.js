const mongoose = require('mongoose');

const userSchema = {
  twitterName: String,
  twitterUsername: String
}

var User = mongoose.model('users', mongoose.Schema(userSchema));

module.exports = User;
