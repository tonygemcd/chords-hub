var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');

//
// ALL
// router.all('/*', function (req, res, next) {
//   console.log('用户模块');
//   next();
// });
router.post('/add', function (req, res) {
  var tony = new UserModel({
    uid: 1002,
    userInfo: {
      nickname: 'Tony',
      meta: {
        age: 18
      }
    }
  });
  tony.save(function (err) {
    if (err) throw err;
    res.send({
      errCode: 0
    });
  });
});

router.route('/:uid')
  .all(function (req, res, next) {
    UserModel.findOne({ uid: req.params.uid }, function (err, user) {
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
    UserModel.findOneAndUpdate({ uid: req.params.uid }, { deleted: true }, function (err, user) {
      if (err) throw err;

      res.json({ errCode: 0 });
    });
  });

module.exports = router;
