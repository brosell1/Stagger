var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');
var compression = require('compression');
var debug = require('debug');
var winston = require('winston');
var mongoose = require('mongoose');

var app = express();

// mongoose.connect('mongodb://stagger:Bootcamp1718@ds135946.mlab.com:35946/angry-eyes');
mongoose.connect('mongodb://localhost/cronTest', {useMongoClient: true});

passport.use(new Strategy ({
  consumerKey: 'FFnMP0rI6pscDaXlbwPa4oCLp',
  consumerSecret: 'vT0UYsW1P2YVkvBIXPyB6sukYiKyGsKRikSIYJfzLCzg5Ypr4o',
  callbackURL: 'http://localhost:5000/api/auth/twitter/callback'
}, (token, tokenSecret, profile, callback) => {
  User.findOrCreate({ twitterId: profile.id }, function (err, user) {
   return callback(err, user);
 });
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});

var index = require('./routes/index');
var login = require('./routes/auth');

var user = require('./models/user');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tweet/', index);
app.use('/api/auth/', login);

app.use('/user', user);

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

app.use(passport.initialize());
app.use(passport.session());

winston.log('info', 'Hello distributed log files!');
winston.info('Hello again distributed logs');

module.exports = app;
