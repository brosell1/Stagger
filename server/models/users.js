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
  ]
}

var Users = mongoose.model('User', mongoose.Schema(userSchema));

module.exports = Users;
