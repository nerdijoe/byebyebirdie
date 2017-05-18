var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  text: {type: String, required: true},
  twit: {type: Schema.Types.ObjectId, ref: 'Twit'}
})

var Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag;
