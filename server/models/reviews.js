var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
    comment         : String,
    created			:Date,
    modified		:Date,
    status			:Number,
    bookingId		:String,
    itemId			:String,
    rating			:Number,
    reviewsUserId	:String 
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Reviews', ReviewsSchema );