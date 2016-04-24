var express = require('express');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');
var webpack = require('webpack');
var webpackConfig = require('./webpack.dev.conf');
var mongoose = require('mongoose');

var userRoute = require('./routes/user');
var usersRoute = require('./routes/users');
var inviteCodeRoute = require('./routes/invite-code');
var loginRoute = require('./routes/login');

// 连接 mongodb
mongoose.connect('mongodb://localhost/chordshubdb');

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// html-webpack-plugin template 改变时，页面 reload
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// 中间件
app.use(history()); // 处理 fallback
app.use(devMiddleware); // webpack bundle output
app.use(hotMiddleware); // enable hot-reload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 静态文件服务
app.use('/static', express.static('./static'));

// RESTful APIs
app.use('/api/user', userRoute); // 用户模块
app.use('/api/users', usersRoute); // 用户组操作
app.use('/api/invite-code', inviteCodeRoute); // 邀请码
app.use('/api/login', loginRoute);

// catch 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app.listen(8888, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:8888\n');
});
