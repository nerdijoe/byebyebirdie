var express = require('express');
// var bodyParser = require('body-parser');

var index = require('./routes/index')
var users = require('./routes/users')

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

app.use('/', index);
app.use('/api/users/', users);

const port = 3000;
app.listen( port, () => {
  console.log(`byebyebirdie is listening to port ${port}`);
})
