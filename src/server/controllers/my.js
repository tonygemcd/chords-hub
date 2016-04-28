var express = require('express');
var router = express.Router();
var SongModel = require('../models/song');
var UserModel = require('../models/user');

router.route('/*')
  .all(function (req, res, next) {
    // 校验登入
    var userQuery = UserModel.findOne({
      _id: req.cookies.user_id
    }).exec();
    userQuery.then(function (userDoc) {
      if (userDoc.isLogined(req.cookies.user_skey)) {
        req._userDoc = userDoc;
        next();
      } else {
        res.json({
          errCode: 1,
          errMsg: '校验登入失败'
        });
      }
    }, function (err) {
      if (err) throw err;

      res.json({
        errCode: 1,
        errMsg: '用户信息获取失败'
      });
    });
  });

// 针对用户的接口
router.route('/song')
  .get(function (req, res) {
    req._userDoc.populate('songs', function (err, populatedDoc) {
      if (err) throw err;

      res.json({
        errCode: 0,
        songs: populatedDoc.songs
      });
    });
  })
  .post(function (req, res) {
    var newSong = new SongModel({
      creator: req._userDoc._id,
      meta: {
        title: req.body.title,
        singers: req.body.singers,
        tone: req.body.tone
      },
      content: {
        lyric: req.body.lyric
      }
    });
    newSong.save().then(function (songDoc) {
      req._userDoc.update({ $push: {songs: songDoc._id} }).exec().then(function () {
        res.json({
          errCode: 0
        });
      });
    });
  });

module.exports = router;
