var User = require('../models/user')
var passwordHash = require('password-hash')
var jwt = require('jsonwebtoken')
require('dotenv').config();

exports.signUp = (req, res, next) => {
  console.log(req.body)
  req.body.password = passwordHash.generate(req.body.password)

  User.create( req.body, (err, user) => {
    if(err) res.send(err)
    else {
      res.send(user)
    }
  })
}

exports.signIn = (req, res, next) => {
  // authentication process is handled by passport
  let user = req.user;
  console.log('user signed in as: ', user)

  var token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email
    },
    process.env.TOKEN_SECRET,
    { expiresIn: '1h'}
  );

  res.send(token)
}

exports.getAll = (req, res, next) => {
  User.find( (err, users) => {
    if(err) res.send(err)
    res.send(users)
  })
}
