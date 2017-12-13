const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const compression = require('compression');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');

passport.use(new Strategy ({
  consumerKey: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumerSecret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  callbackURL: 'http://localhost:5000/api/twitter'
}, (token, tokenSecret, profile, callback) => {
  return callback(null, profile);
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

var index = require('./routes/index');
var login = require('./routes/auth');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tweet/', index);
app.use('/api/auth/', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

app.use(compression());

app.use(session({
  secret: 'thisisasecret',
  resave: true,
  saveUninitialized: true
}));

module.exports = app;
