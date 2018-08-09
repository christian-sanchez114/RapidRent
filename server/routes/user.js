'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken'),
  config = require('../../config.json'),
  tokenList = {};

exports.create_a_user = function(req, res) {
  var newuser = {
    firstName   : req.body.firstName,
    lastName    : req.body.lastName,
    userName  :req.body.userName,
    email     : req.body.email,
    active    :false,
    phoneNumber: null,
    message     : '',
    role    : req.body.role,
    password  : req.body.password,
    created   :new Date()
  }
  var encryptPass='';
  User.find({email:req.body.email},function(err,data){
    if (data[0] !=undefined && data[0].email==newuser.email) {
      res.json({errorMessage:'email id already exist.'})
    }else{
      // encrypt password 
      bcrypt.hash(newuser.password, 10, function( err, bcryptedPassword) {
        newuser.password=bcryptedPassword;
        var new_user=User(newuser)
        new_user.save(function(err, task) {
            if (err)
              res.send(err);
            res.json(task);
        });
      });
    }
  }) 
};
exports.remove_a_user = function(req, res) {
  User.remove( { _id : req.body._id } ,function(err,data){
     if (err)
        res.send(err);
      res.json(data);
  })
};
exports.update_a_user=function(req,res){
  User.update({_id:req.body._id},
    req.body,function(err,data){
      console.log(err,data)
      if (err)
        res.send(err);
      res.json(data);
    })
}
exports.active_inactive_a_user=function(req,res){
  User.updateOne({_id:req.body.userid},
    {$set: {active:req.body.status}},function(err,data){
      if (err)
        res.send(err);
      res.json(data);
    })
}
exports.getusers = function(req, res) {
	var perPage = 10;
    var page = req.query.pageNo || 1
    User
        .find({ role: { $ne: "admin" } })
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, users) {
            User.count().exec(function(err, response) {
                 if (err) return next(err)                
                res.json({users:users,totalpages:response});
             })
        })
		
  
  
};
exports.getuserbyid = function(req, res) {
	console.log('query:',req.query)
  User.find({_id:req.query._id},function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
  });
  
};
exports.forgot_password = function(req, res) {
  User.find({email:req.body.email},function(err,data){
    // if (data[0].email==newuser.email) {
      // res.json({errorMessage:'email id already exist.'})
    // }else{
        new_user.save(function(err, task) {
            if (err)
              res.send(err);
            res.json(task);
        });
    // }
  }) 
};

exports.reset_password = function(req, res) {
  User.find({email:req.body.email},function(err,data){
    // if (data[0].email==newuser.email) {
      // res.json({errorMessage:'email id already exist.'})
    // }else{
        new_user.save(function(err, task) {
            if (err)
              res.send(err);
            res.json(task);
        });
    // }
  }) 
};

exports.change_password = function(req, res) {
    User.find({_id:req.body._id}, function (error, results) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length>0){
            bcrypt.compare(req.body.password,results[0].password, function(err, doesMatch){
              if (doesMatch){
                console.log('mathch:',doesMatch,req.body.newPassword)
                bcrypt.hash(req.body.newPassword, 10, function( err, bcryptedPassword) {
                  User.updateOne({_id:req.body._id},{
                    $set: { password: bcryptedPassword }},function(err,data){
                      console.log('bcryptedPassword:',data)
                      res.json(data);
                    // bcryptedPassword;
                  });
                })  
              }else{
                console.log(results)
              console.log("goaway")
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
              }
            });
        }else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      } 
    })
};

exports.authenticate=function(req,res){
  var user = {
      "email": req.body.email,
      "password": req.body.password
  }
  var email=req.body.email,
  password=req.body.password;
    User.find({email:req.body.email}, function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            bcrypt.compare(password, results[0].password, function(err, doesMatch){
              if (doesMatch){
                 //log him in
                var token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
                var refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
                var response = {
					"role":results[0].role,
					"active":results[0].active,
					"userName":results[0].userName,
                    "user":results[0]._id,
                    "status": "Logged in",
                    "token": token,
                    "refreshToken": refreshToken,
                }
                tokenList[refreshToken] = response
                res.status(200).json(response);
                 
              }else{
              console.log("goaway")
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
              }
            });
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
};

exports.token=function(req,res){
  // refresh the damn token
    var postData = req.body
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        var user = {
            "email": postData.email,
            "name": postData.name
        }
        var token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        var response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
}

exports.find10users=function(req,res){

  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {},response=null;
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
       User.count({},function(err,totalCount) {
             if(err) {
               response = {"error" : true,"message" : "Error fetching data"}
             }
         User.find({},{},query,function(err,data) {
              // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var totalPages = Math.ceil(totalCount / size)
                response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
         });
       })
}


exports.recentUsers=function(req,res){
   var perPage = 10
    var page = req.params.page || 1
    User
        .find({ role: { $ne: "admin" } })
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            // User.count().exec(function(err, response) {
                // if (err) return next(err)
                // res.render('main/products', {
                //     products: products,
                //     current: page,
                //     pages: Math.ceil(count / perPage)
                // })
                res.json(products);
            // })
        })
}
// router.use(require('../tokenChecker'))

