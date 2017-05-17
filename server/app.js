var express = require('express');
// var bodyParser = require('body-parser');

var index = require('./routes/index')

var app = express();


app.use('/', index);

const port = 3000;
app.listen( port, () => {
  console.log(`byebyebirdie is listening to port ${port}`);
})
