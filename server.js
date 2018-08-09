// require('rootpath')();
var express = require('express');
var app = express();
// var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config.json');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var CATEGORY = require('./server/models/category');
var ENQUIRY = require('./server/models/enquiry');
var Items = require('./server/models/items');
var User = require('./server/models/user');
var Bookings = require('./server/models/bookings');
//Create database
var url = config.connectionString;
mongoose.connect(url,function(){
	console.log('MongoDB connected')
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.static(__dirname + '/public'));
// app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ROUTE API
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next route
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.use(require('./server/tokenChecker'))

// REGISTER ROUTES
var routes = require('./server/routes/routes');
app.use('/api', routes);
app.get('/', function (req, res) {
    return res.redirect('./rapid-rent/index.html');
});

//CREATE THIS ADMIN
User.find({userName:'rapidadmin'},function(err,result){
console.log(err,'super admin is there')
if(result.length>0){

}else{
  var newAdmin ={
    firstName   : 'rapidadmin',
    lastName    : '',
    userName  :'rapidadmin',
    email     : 'admin@rapidrent.com',
    role    : 'admin',
    password  : 'admin',
    created   :new Date()
  }

  bcrypt.hash(newAdmin.password, 10, function( err, bcryptedPassword) {
    newAdmin.password=bcryptedPassword;
    newAdmin=User(newAdmin)
    newAdmin.save(function(err, task) {
        if (err)
        console.log(err);
        console.log('super admin created');
    });
  });
}
})

// start server - address then port
var server = app.listen(8080, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});