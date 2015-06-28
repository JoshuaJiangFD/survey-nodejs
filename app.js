var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
if (app.get('env') === 'development')
  app.set('views', path.join(__dirname, 'views'));
else
  app.set('views', path.join(__dirname, 'dist/views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
  static file folder
 */
if (app.get('env') === 'development')
  app.use(express.static(path.join(__dirname, 'public')));
else
  app.use(express.static(path.join(__dirname, 'dist/static')));


/**
 * loading the route.
 */
app.use('/', routes);
app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/**
 * error handling middleware
 *  --should be loaded after the loading the routes
 */
/* development error handler,will print stacktrace
    --make sure to put it before the production error handler.
*/
if (app.get('env') === 'development') {/*or process.env.NODE_ENV*/
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/*
 production error handler,no stacktraces leaked to user
*/
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
