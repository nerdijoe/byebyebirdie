var Twit = require('../models/twit')

exports.create = (req, res, next) => {
  Twit.create(req.body, (err, twit) => {
    if(err) res.send(err)
    else {
      res.send(twit);
    }
  })
}

exports.getAll = (req, res, next) => {
  Twit.find()
  .sort({created_at: -1})
  .populate("user")
  .exec( (err, twits) => {
    if(err) res.send(err);
    else{
      res.send(twits);
    }
  })
}
