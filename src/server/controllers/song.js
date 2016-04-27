var express = require('express');
var router = express.Router();
var SongModel = require('../models/song');
var UserModel = require('../models/user');

router.route('/')
  .get(function (req, res) {
    var songQuery = SongModel.find({}).exec();
    songQuery.then(function (docs) {
      res.json({
        errCode: 0,
        songList: docs
      });
    });
  })
  .post(function (req, res) {
    var newSong = new SongModel({
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
      var userQuery = UserModel.findOne({
        _id: req.cookies.user_id
      }).exec();
      userQuery.then(function (userDoc) {
        if (userDoc.isLogined(req.cookies.user_skey)) {
          userDoc.update({ $push: {'songs': songDoc._id} }).exec().then(function () {
            res.json({
              errCode: 0
            });
          });
        } else {
          res.json({
            errCode: 1,
            errMsg: '校验登入失败'
          });
        }
      });
    });
  });

module.exports = router;
