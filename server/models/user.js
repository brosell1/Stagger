const mongoose = require('mongoose');

const userSchema = {

  id: Number,
  accounts: [
    {
      userAccount: String,
      service: String,
      access_token_key: String,
      access_token_secret: String
    }
  ],
  queue: [
    {
      postId: Number,
      postContent: String,
      postMedia: String,
      scheduledTime: Date,
      accountsToPostTo: [Object]
    }
  ]

}

var User = mongoose.model('User', mongoose.Schema(userSchema));

module.exports = User;
