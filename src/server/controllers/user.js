var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var InviteCodeModel = require('../models/invite-code');

router.post('/', function (req, res) {
  var inviteCodeQuery = InviteCodeModel.findOne({ code: req.body.invitecode }).exec();

  inviteCodeQuery.then(function (inviteCodeDoc) {
    // Fullfill
    if (inviteCodeDoc.actived) { // 激活码可用
      var newUser = new UserModel({
        username: req.body.username,
        password: req.body.password
      });
      newUser.save().then(function () {
        inviteCodeDoc.actived = false; // 设置激活码状态为不可用
        inviteCodeDoc.updatedAt = new Date(); // 更新修改时间
        inviteCodeDoc.save(function () {
          res.json({
            errCode: 0
          });
        });
      });
    } else {
      res.json({
        errCode: 1,
        errMsg: '此邀请码已经被使用'
      });
    }
  }, function (err) {
    // Rejected
    if (err) throw err;
  });
});

router.route('/:id')
  .all(function (req, res, next) {
    UserModel.findOne({ _id: req.params.id }, function (err, user) {
      if (err) return next(err);

      req._user = user;
      next();
    });
  })
  // 获取用户信息
  .get(function (req, res) {
    res.json({
      errCode: 0,
      data: {
        userInfo: req._user.userInfo
      }
    });
  })
  // 更新用户信息
  .put(function (req, res) {
    console.log('update user info');
  })
  // 删除用户
  .delete(function (req, res) {
    UserModel.findOneAndUpdate({ _id: req.params.id }, { deleted: true }, function (err, user) {
      if (err) throw err;

      res.json({ errCode: 0 });
    });
  });

module.exports = router;
