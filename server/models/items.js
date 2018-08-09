var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ItemsSchema = new Schema({
    name          	: String,
    description   	: String,
    price 			: Number,
    startDate		: Date,
    endDate			: Date,
    created			: Date,
    modified		: Date,
    status			: Number,
    files           : [{
        filename:String,
        originalname:String,
        path:String
    }],
    categoryId		: String,
    userId			: String 
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Items', ItemsSchema );