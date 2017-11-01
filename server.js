var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//read env file
require('./util/readenv').config();

//connect to db
require('./config/connectdb');

//compile models
require('./config/compile-models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//logger
app.use(function(req, res, next) {
    console.log(req.method + ' - ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    next();
});

const routes = require('./routes/');
app.use('/', routes);
app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/model', // Your models directory.
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: require('mongoose') // The mongoose database connection.
}));
require('./util/crone-job-currency-layer');


app.listen(process.env.port, function () {
  console.log('Example app listening on port', process.env.port)
})
