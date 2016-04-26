var express = require('express');
var router = express.Router();
var ChordsModel = require('../models/chords');
// var UserModel = require('../models/user');

router.route('/')
  .get(function (req, res) {
    ChordsModel.find({}).then(function (chordsDocs) {
      res.json({
        errCode: 0,
        chordsList: chordsDocs
      });
    });
  })
  .post(function (req, res) {
    var newChords = new ChordsModel({
      meta: {
        title: req.body.title,
        singers: req.body.singers,
        tone: req.body.tone
      },
      content: {
        lyric: req.body.lyric
      }
    });
    newChords.save().then(function () {
      res.json({
        errCode: 0
      });
    });
  });

module.exports = router;
