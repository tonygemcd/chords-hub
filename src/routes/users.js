var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var async = require('async');

router.route('/')
  // 获取所有用户信息
  .get(function (req, res) {
    UserModel.find({}, function (err, users) {
      if (err) throw err;

      res.json({
        errCode: 0,
        users: users
      });
    });
  })
  // 删除所有用户
  .delete(function (req, res) {
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
        users: users
      });
    });
  });

module.exports = router;
