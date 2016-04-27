var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var randomString = require('random-string');

// 登入
router.post('/', function (req, res) {
  var newSkey = randomString({ length: 6 });
  var userQuery = UserModel.findOneAndUpdate({
    username: req.body.username,
    password: req.body.password
  }, { skey: newSkey }).exec();
  // 这里使用update好还是save好？
  userQuery.then(function (doc) { // 这里传递的 doc 中的数据是未update之前的
    res.json({
      errCode: 0,
      skey: newSkey,
      id: doc._id
    });
  }, function (err) {
    if (err) throw err;
    res.json({
      errCode: 1,
      errMsg: '登入失败'
    });
  });
});

// 校验登入态
router.get('/', function (req, res) {
  var userQuery = UserModel.findOne({
    _id: req.cookies.user_id
  }).exec();
  userQuery.then(function (doc) {
    if (!doc) {
      res.json({
        errCode: 1,
        errMsg: '找不到该用户'
      });
    } else if (doc.isLogined(req.cookies.user_skey)) {
      res.json({
        errCode: 0
      });
    } else { // skey验证失败
      res.json({
        errCode: 1,
        errMsg: '登入验证失败'
      });
    }
  }, function (err) {
    if (err) throw err;
    res.json({
      errCode: 1,
      errMsg: '验证登入失败'
    });
  });
});

module.exports = router;
