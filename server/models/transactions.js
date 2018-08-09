var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    name          : String,
    description   : String,
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Transaction', TransactionSchema );