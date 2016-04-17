var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// 每次保存前，更新日期
userSchema.pre('save', function (next) {
  var currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) this.created_at = currentDate;

  next();
});

// create a model by schema
var User = mongoose.model('User', userSchema);

module.exports = User;
