var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookingsSchema = new Schema({
    name          	: String,
    description   	: String,
    price 			: Number,
    startDate		: Date,
    endDate			: Date,
    created			: Date,
    modified		: Date,
    status			: String,
    files           : [{
        filename:String,
        originalname:String,
        path:String
    }],
    categoryId		: String,
    landerId			: String,
    renterId		: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Bookings', BookingsSchema );