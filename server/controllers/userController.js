var User = require('../models/user')
var passwordHash = require('password-hash')

exports.signup = (req, res, next) => {
  req.body.password = passwordHash.generate(req.body.password)
  User.create( req.body, (err, user) => {
    if(err) res.send(err)
    else {
      res.send(user)
    }
  })
}
