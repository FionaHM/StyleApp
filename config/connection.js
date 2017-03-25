var mongoose = require('mongoose');
// connect to the database

// var MONGODB_URI = 'mongodb://heroku_6mzw55vf:t095a30cer0nuka2l01e11vmf5@ds141960.mlab.com:41960/heroku_6mzw55vf';
// var connectionString = process.env.MONGODB_URI | 'mongodb://localhost:27017/styleapp';
// var connection = mongoose.connect('mongodb://heroku_6mzw55vf:t095a30cer0nuka2l01e11vmf5@ds141960.mlab.com:41960/heroku_6mzw55vf');
var connection = mongoose.connect('mongodb://localhost:27017/styleapp');
// export the connection

// var connection = mongoose.connect(connectionString);

module.exports = connection;
