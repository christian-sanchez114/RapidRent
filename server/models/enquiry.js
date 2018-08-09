var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var EnquirySchema = new Schema({
    name          : String,
    email		:String,
    mobile		:Number,
    subject		:String,
    message		:String,
    created   	:  Date
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Enquiry', EnquirySchema );