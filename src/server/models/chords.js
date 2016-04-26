var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 歌曲信息
var metaSchema = new Schema({
  tone: String,
  title: String,
  singers: Array
}, { _id: false });

// 内容信息
var contentSchema = new Schema({
  lyric: String // 和弦 + 歌词
}, { _id: false });

var chordsSchema = new Schema({
  meta: metaSchema,
  content: contentSchema,
  creatorId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var Chords = mongoose.model('Chords', chordsSchema);

module.exports = Chords;
