var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter= require('./routes/photos');

var app = express();



// view engine setup
// 指定了express在查找视图时所用的目录
app.set('views', path.join(__dirname, 'views'));

// 指定模板引擎
app.set('view engine', 'ejs');
// app.set('view engine', 'jade');

app.set('photos', path.join(__dirname, 'public/photos')) // 定义照片上传路径

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', photosRouter.list); // 获取图片列表
app.get('/upload', photosRouter.form);
app.post('/upload', photosRouter.submit(app.get('photos'))); 

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
  res.render('error');
});

module.exports = app;
