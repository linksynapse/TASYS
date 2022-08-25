var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var iclock = require('./routes/iclock');

var app = express();

app.use(bodyParser.text({type:'application/push'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// API router
app.use('/iclock', iclock);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(res.locals.message);
});

module.exports = app;
