var mongoose = require('mongoose');
// connect to the database
// var connectionString = process.env.MONGODB_URI | 'mongodb://localhost:27017/styleapp';
// var connection = mongoose.connect(process.env.MONGODB_URI);
var connection = mongoose.connect('mongodb://localhost:27017/styleapp');
// export the connection
module.exports = connection;