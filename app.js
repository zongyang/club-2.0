var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');
//会话信息存储到数据库
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);

var routes = require('./routes/routes');
var settings=require('./settings');
var flash=require('connect-flash');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
//文件上传的配置
app.use(multer({
  dest:settings.dest,
  rename:function(fieldname,filename){//文件命名方式
    var date=new Date();
    //var formate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    //return fieldname+'-'+formate;
    return fieldname;
  },
  limits:{
    fileSize:settings.size
  }
}));
//session
app.use(session({
  secret:settings.cookieSecert,
  key:settings.db, //cookie name
  cookie:{maxAge:1000*60*60*2},//2hours
  store:new MongoStore({
    db:settings.db,
    host:settings.host
  })
}));


app.use('/', routes);


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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(settings.port);
module.exports = app;
