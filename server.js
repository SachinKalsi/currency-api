var express = require('express');
var app = express();

//read env file
require('./util/readenv').config();

//connect to db
require('./config/connectdb');

//compile models
require('./config/compile-models');

//logger
app.use(function(req, res, next) {
    console.log(req.method + ' - ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
});

const routes = require('./routes/');
app.use('/', routes);

app.listen(process.env.port, function () {
  console.log('Example app listening on port', process.env.port)
})
