var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/mini_twitter').connection;

db.on('open', function() {
   console.log('MongoDB is connected');
});

db.on('error', function() {
   console.log('Something went wrong in MongoDB');
});

db.on('reconnect', function() {
   console.log('Need reconnect');
});

return db;