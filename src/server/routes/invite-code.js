var express = require('express');
var router = express.Router();
var InviteCodeModel = require('../models/invite-code');
var randomString = require('random-string');
var async = require('async');

// 创建邀请码
router.post('/generate', function (req, res) {
  var codes = [];
  for (var i = 0; i < 20; i++) {
    codes.push({
      code: randomString({ length: 10 })
    });
  }
  console.log(codes);
  InviteCodeModel.create(codes, function (err) {
    if (err) throw err;
    res.send({
      errCode: 0
    });
  });
});

router.route('/all')
  .get(function (req, res) {
    InviteCodeModel.find({}, function (err, inviteCodes) {
      if (err) throw err;

      res.json({
        errCode: 0,
        inviteCodes: inviteCodes
      });
    });
  })
  .delete(function (req, res) {
    InviteCodeModel.find({}, function (err, inviteCodes) {
      if (err) throw err;

      var idsArray = [];
      for (var i = 0; i < inviteCodes.length; i++) {
        idsArray.push(inviteCodes[i]._id);
      }
      async.parallel({
        function (callback) {
          InviteCodeModel.remove({ _id: { $in: idsArray } }, function (err) {
            if (err) throw err;

            console.log('invite codes deleted: ' + JSON.stringify(idsArray));
          });
        }
      });

      res.send({
        errCode: 0
      });
    });
  });

module.exports = router;
