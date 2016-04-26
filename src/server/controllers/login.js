var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var randomString = require('random-string');

// 登入
router.post('/', function (req, res) {
  var userQuery = {
    username: req.body.username,
    password: req.body.password
  };
  UserModel.findOne(userQuery).then(function (userDoc) {
    var skey = randomString({ length: 6 });
    userDoc.skey = skey;
    return userDoc.save(function () {
      res.json({
        errCode: 0,
        skey: skey,
        id: userDoc._id
      });
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
  var userQuery = {
    _id: req.cookies.user_id,
    skey: req.cookies.user_skey
  };
  UserModel.findOne(userQuery).then(function () {
    res.json({
      errCode: 0
    });
  }, function (err) {
    if (err) throw err;
    res.json({
      errCode: 1,
      errMsg: '验证登入失败'
    });
  });
});

module.exports = router;
