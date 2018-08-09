var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName   : String,
    lastName    : String,
    userName	:String,
    email 		: String,
    role 		: String,
    password	: String,
    active		: Boolean,
    phoneNumber: Number,
    message     : String,
    address		: String,  
    created		: Date,
    updated		: Date
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema );