var express = require('express');
var router = express.Router();
var SongModel = require('../models/song');

router.route('/')
  .get(function (req, res) {
    var songQuery = SongModel.find({}).exec();
    songQuery.then(function (docs) {
      res.json({
        errCode: 0,
        songs: docs
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
    newSong.save().then(function () {
      res.json({
        errCode: 0
      });
    });
  });

// 通过歌曲 id 获取歌曲信息
router.route('/:song_id')
  .get(function (req, res) {
    var songQuery = SongModel.findById(req.params.song_id).exec();
    songQuery.then(function (doc) {
      if (doc) {
        res.json({
          errCode: 0,
          song: doc
        });
      } else {
        res.json({
          errCode: 1,
          errMsg: '没有找到'
        });
      }
    });
  });

module.exports = router;
