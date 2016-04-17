var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var async = require('async');

//
// ALL
router.all('/*', function (req, res, next) {
  console.log('用户模块');
  next();
});

//
// GET userList
// 获取所有用户信息
router.get('/list', function (req, res) {
  UserModel.find({}, function (err, users) {
    if (err) throw err;

    res.send({
      errCode: 0,
      data: {
        users: users
      }
    });
  });
});

//
// POST
// 添加用户
router.post('/add', function (req, res) {
  var tony = new UserModel({
    name: 'Tony',
    meta: {
      age: '18'
    }
  });
  tony.save(function (err) {
    if (err) throw err;
    res.send({
      errCode: 0,
      data: {}
    });
  });
});

//
// DELETE
// 删除所有用户
router.delete('/deleteall', function (req, res) {
  UserModel.find({}, function (err, users) {
    if (err) throw err;

    var idsArray = [];
    for (var i = 0; i < users.length; i++) {
      idsArray.push(users[i]._id);
    }
    async.parallel({
      function (callback) {
        UserModel.remove({ _id: { $in: idsArray } }, function (err) {
          if (err) throw err;

          console.log('deleted: ' + JSON.stringify(idsArray));
        });
      }
    });

    res.send({
      errCode: 0,
      data: {
        users: users
      }
    });
  });
});

module.exports = router;
