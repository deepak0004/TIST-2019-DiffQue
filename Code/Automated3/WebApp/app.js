var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('express-example');
var session = require('express-session')

var routes = require('./app/routes/index');
var apiRouter = require('./app/routes/api');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

logger.format('custom',':date[clf] :method :url :status :response-time ms - :res[content-length] ');
app.use(logger('custom'));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(cookieParser('#h4865sBHkL%?'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', routes); // frontend
app.use('/api',apiRouter); //db
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;