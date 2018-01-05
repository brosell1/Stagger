const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

const User = require('../models/users');

passport.use(new Strategy({
  consumerKey: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumerSecret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  callbackURL: 'http://localhost:5000/api/auth/twitter/callback'
}, (token, tokenSecret, profile, done) => {
  console.log(profile);
  User.findOne({
    'twitterUsername': profile.username
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      user = new User({
        twitterName: profile.displayName,
        twitterUsername: profile.username,
        twitter: profile._json
      });
      user.save(function(err) {
        if (err)
          console.log(err);
        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

router.get('/', function(req, res) {
  res.send('Login via Twitter!');
});

router.get('/twitter', passport.authenticate('twitter'));

router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function(req, res) {
  // res.redirect('/');
  res.sendFile('/Users/SoC11/Desktop/work/Final Project/final-project-artist-api/server/routes/ar15.jpg')
});

module.exports = router;
