var express = require('express');
var cors = require('cors');
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

mongoose.connect('mongodb://StaggerUser:password@ds135946.mlab.com:35946/angry-eyes', {useMongoClient: true});

var tweet = require('./routes/tweet');
var auth = require('./routes/auth');
var nlp = require('./routes/nlp');
var giphy = require('./routes/giphy');

var media = require('./libs/media');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(session({
  secret: 'angryeyes',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/api/tweet/', tweet);
app.use('/api/auth/', auth);
app.use('/api/nlp/', nlp);
app.use('/api/giphy', giphy);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.send('error');
// });

app.use(compression());

winston.log('info', 'Hello distributed log files!');
winston.info('Hello again distributed logs');

module.exports = app;
