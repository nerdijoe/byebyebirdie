var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var passwordHash = require('password-hash');
var User = require('./models/user')

var index = require('./routes/index')
var users = require('./routes/users')
var twits = require('./routes/twits')

var app = express();

var mongoose = require('mongoose');
var mongodbConfig = {
  development: 'mongodb://localhost/byebyebirdie_dev',
  test: 'mongodb://localhost/byebyebirdie_test'
}

var app_env = app.settings.env;
mongoose.connect( mongodbConfig[app_env], (err, res) => {
  console.log('connected to DB: ' + mongodbConfig[app_env])
})

passport.use(new Strategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!passwordHash.verify(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


app.use('/', index);
app.use('/api/users', users);
app.use('/api/twits', twits);

const port = 3000;
app.listen( port, () => {
  console.log(`byebyebirdie is listening to port ${port}`);
})
