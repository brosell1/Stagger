var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy ({
  consumerKey: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumerSecret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  callbackURL: 'http://localhost:5000/api/twitter'
}, (token, tokenSecret, profile, callback) => {
  return callback(null, profile);
}));

router.get('/twitter',
  passport.authenticate('twitter'),
);

router.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

module.exports = router;
