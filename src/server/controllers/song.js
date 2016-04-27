var express = require('express');
var router = express.Router();
var SongModel = require('../models/song');
// var UserModel = require('../models/user');

router.route('/')
  .get(function (req, res) {
    SongModel.find({}).then(function (docs) {
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
    newSong.save().then(function () {
      res.json({
        errCode: 0
      });
    });
  });

module.exports = router;
