var Twit = require('../models/twit')
var Tag = require('../models/tag')


exports.create = (req, res, next) => {
  let user = req.decoded;

  var newTwit = new Twit({
    text: req.body.text,
    user: user._id,
    tags: []
  })

  console.log("newTwit=",newTwit)

  var pattern = /(#\w+)/gi;
  var matches = newTwit.text.match(pattern);
  console.log("tags in the text=", matches)

  var final_matches = matches.map( m => m.replace(/#/, ''))
  console.log('strip matches: ', final_matches)

  final_matches.map( m => newTwit.tags.push(m) )

  console.log("newTwit after tags are added: ", newTwit)

  newTwit.save( (err, twit) => {
    if(err) res.send(err)
    else {
      // res.send(twit)

      Twit.findById(twit._id)
      .populate("user")
      .sort({created_at: -1})
      .exec( (err, t) => {
        if(err) res.send(err);
        else{
          res.send(t);
        }
      })

    }
  })

  // res.send(newTwit)
}

exports.getAll = (req, res, next) => {
  Twit.find()
  .sort({created_at: -1})
  .populate("user")
  .sort({created_at: -1})
  .exec( (err, twits) => {
    if(err) res.send(err);
    else{
      res.send(twits);
    }
  })
}

exports.delete = (req, res, next) => {
  Twit.findByIdAndRemove(req.params.id, (err, twit) => {
    if(err) res.send(err)
    else {
      res.send(twit)
    }
  })
}
