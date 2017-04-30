var mongoose = require('mongoose');

var dbName = process.env.dbname || 'currency';
mongoose.connect('mongodb://localhost/' + dbName);

var db = mongoose.connection;

db.on('error', function() {
    console.log('Error connecting to the db ', dbName);
});
db.once('open', function() {
  console.log('successfully connected to DB ', dbName);
});
