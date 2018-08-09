'use strict';
var mongoose = require('mongoose'),
  Enquiry = mongoose.model('Enquiry');

exports.createEnquiry = function(req, res) {
  var newEnquiry = {
    name   : req.body.name,
    email   :req.body.email,
    mobile    :req.body.mobile,
    subject   :req.body.subject,
    message   :req.body.message,
    created   : new Date()
    },
  new_Enquiry=Enquiry(newEnquiry);
	new_Enquiry.save(function(err, task) {
	    if (err)
	      res.send(err);
	    res.json(task);
	});
  
};
exports.getEnquiries = function(req, res) {
	   var perPage = 10;
    var page = req.query.pageNo || 1
    Enquiry
        .find({})
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, EnquiryData) {
             Enquiry.count().exec(function(err, response) {
                 if (err) return next(err)
			 res.json({EnquiryData:EnquiryData,totalcount:response});
            })
        })  
};
exports.recentEnquiries=function(req,res){
   var perPage = 9
    var page = req.params.page || 1
    Enquiry
        .find({})
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, EnquiryData) {
            // User.count().exec(function(err, response) {
                // if (err) return next(err)
                // res.render('main/products', {
                //     products: products,
                //     current: page,
                //     pages: Math.ceil(count / perPage)
                // })
                res.json(EnquiryData);
            // })
        })
}
// exports.removeEnquiry=function(req,res){
//   Enquiry.remove( { _id : req.body._id } ,function(err,data){
//      if (err)
//         res.send(err);
//       res.json(data);
//   })
// }
// exports.updateEnquiry=function(req,res){

//   User.findOneAndUpdate({query: {_id:req.body._id},
//       update: { name: req.body.name,description:req.body.description }},function(err,data){
//         console.log(err,data)
//       })
// }