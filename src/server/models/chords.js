var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 歌曲信息
var metaSchema = new Schema({
  major: String
});

// 内容信息
var contentSchema = new Schema({
  content: String // 和弦 + 歌词
});

var chordsSchema = new Schema({
  meta: metaSchema,
  content: contentSchema,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var Chords = mongoose.model('Chords', chordsSchema);

module.exports = Chords;
