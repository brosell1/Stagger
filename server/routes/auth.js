var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

var User = require('../models/users');

passport.use(new Strategy ({
  consumerKey: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumerSecret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  callbackURL: 'http://localhost:5000/api/auth/twitter/callback'
}, (token, tokenSecret, profile, callback) => {
  User.findOrCreate({ twitterId: profile.id }, function (err, user) {
   return callback(err, user);
 });
}));


router.get('/', function(req, res) {
  res.send('Login via Twitter!');
});

router.get('/twitter',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/login' })
);


router.get('/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login'
}),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
