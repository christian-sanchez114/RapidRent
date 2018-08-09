'use strict';
var mongoose = require('mongoose'),
  Bookings = mongoose.model('Bookings');

exports.createBookings = function(req, res) {
  var newBookings = {
    name            : req.body.name,
    description     : req.body.description,
    price       : req.body.price,
    startDate   : req.body.startDate,
    endDate     : req.body.endDate,
    created     :new Date(),
    modified    :new Date(),
	files 		:req.body.files,
    status      :"pending",
    categoryId    :req.body.categoryId,
    landerId      :req.body.landerId,
    renterId    :req.body.renterId
  },
  new_Bookings=Bookings(newBookings);
	new_Bookings.save(function(err, task) {
	    if (err)
	      res.send(err);
	    res.json(task);
	});
};

exports.getBookings = function(req, res) {
  // Bookings.find(function(err, data) {
  //     if (err)
  //       res.send(err);
  //     res.json(data);
  // });
     var perPage = 10;
    var page = req.query.pageNo || 1
    Bookings
        .find()
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, bookings) {
             Bookings.count().exec(function(err, response) {
                 if (err) return next(err)
      res.json({Bookings:bookings,totalcount:response});
            })
        })  
};
// exports.removeBookings=function(req,res){
//   Bookings.remove( { _id : req.body._id } ,function(err,data){
//      if (err)
//         res.send(err);
//       res.json(data);
//   })
// }
// exports.updateBookings=function(req,res){
//   Bookings.update({_id:req.body._id},
//       req.body,function(err,data){
//         if (err)
//         res.send(err);
//       res.json(data);
//   })
// }
// exports.getBookingsByCategory=function(req,res){
//    var perPage = 10;
//     var page = req.query.pageNo || 1
//     Bookings
//         .find({categoryId:req.query.categoryId})
//         .sort({created: -1})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, Bookings) {
//              Bookings.count().exec(function(err, response) {
//                  if (err) return next(err)
// 			 res.json({Bookings:Bookings,totalcount:response});
//             })
//         })  
// }
exports.getBookingsById=function(req,res){
  var query={}
  if (req.query.landerId) {
    query={landerId:req.query.landerId}
  }
  if (req.query.renterId) {
    query={renterId:req.query.renterId}
  }
  Bookings.find(query,function(err,result){
    if (err)
        res.send(err);
      res.json(result);
  })
};
exports.accept_reject=function(req,res){
  Bookings.updateOne({_id:req.body._id},
    {$set: {status:req.body.status}},function(err,data){
      if (err)
        res.send(err);
      res.json(data);
    })
};
// exports.getBookingsByFilter=function(req,res){
//   // req.body.priceGt
//   // req.body.priceLt
//   // req.body.categoryId
//   // req.body.name

//   var q={}
//   q['$and']=[];
//   if(req.body.categoryId){ // if the criteria has a value or values
//     q["$and"].push({ categoryId: req.body.categoryId}); // add to the query object
//   }
//   if (req.body.priceGt && req.body.priceLt) {
//    q["$and"].push({price:{$gt:req.body.priceGt,$lt:  req.body.priceLt}});
 
//   }
//   if (req.body.name) {
//    q["$and"].push({name:{ $regex : req.body.name } });
 
//   }

//    var perPage = 10;
//     var page = req.query.pageNo || 1
//     Bookings
//         .find(q)
//         .sort({created: -1})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec(function(err, Bookings) {
//              Bookings.count().exec(function(err, response) {
//                  if (err) return next(err)
//     res.json({Bookings:Bookings,totalcount:response});
//             })
//         })  
// }