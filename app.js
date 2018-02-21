var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./lib/connectMongoose');
require('./models/Anuncio');

global.appRoot = path.resolve(__dirname);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(request, response, next) {
    next();
});

app.use('/', require('./routes/index'));
app.use('/tags', require('./routes/tags'));
app.use('/crear', require('./routes/crear'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  next();
});

// error handler
app.use(function(err, req, res, next) {
 if(err.array) {
      err.status = 422;
      const errInfo = err.array({ onlyFirstError: true })[0];
      err.message = `No valido - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if(isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

function isAPI( req ) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
