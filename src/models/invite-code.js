var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inviteCodeSchema = new Schema({
  code: String,
  actived: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// 每次保存前
inviteCodeSchema.pre('save', function (next) {
  next();
});

// 每次更新之后，更新日期
inviteCodeSchema.post('findOneAndUpdate', function (doc) {
  var currentDate = new Date();
  doc.updatedAt = currentDate;
  doc.save();
});

// create a model by schema
var InviteCode = mongoose.model('InviteCode', inviteCodeSchema);

module.exports = InviteCode;
