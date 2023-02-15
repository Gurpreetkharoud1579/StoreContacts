// get the library
const mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://127.0.0.1:27017/contactsApp');

// get the database 
db = mongoose.connection;

// check for errors while connectiong to database
db.on('error', console.error.bind(console, 'Connection to database failed'));

// on connection console log connection is made
db.once('open', function callback() {
    console.log("Successfully connected database");
});