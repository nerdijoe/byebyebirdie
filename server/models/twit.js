var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var twitSchema = new Schema({
  text: {type: String, required: true},
  hashtag: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  created_at: {type: Date, required: false, default: Date.now}
})

var Twit = mongoose.model('Twit', twitSchema);

module.exports = Twit;
