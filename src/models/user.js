var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({
  nickname: String,
  meta: {
    age: { type: Number, min: 0, max: 200 },
    gender: Number, // 1: male, 2: female
    website: String
  }
});

// create a schema
var userSchema = new Schema({
  username: String,
  password: String,
  userInfo: userInfoSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
  deleted: Boolean
});

// 每次保存前
userSchema.pre('save', function (next) {
  next();
});

// 每次更新之后，更新日期
userSchema.post('findOneAndUpdate', function (doc) {
  var currentDate = new Date();
  doc.updatedAt = currentDate;
  doc.save();
});

// create a model by schema
var User = mongoose.model('User', userSchema);

module.exports = User;
