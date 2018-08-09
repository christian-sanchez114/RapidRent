'use strict';
var mongoose = require('mongoose'),
  Category = mongoose.model('Category');

exports.createCategory = function(req, res) {
  var newCategory = {
    name   : req.body.name,
    description    : req.body.description,
    created   : new Date()
  },
  new_Category=Category(newCategory);
	new_Category.save(function(err, task) {
	    if (err)
	      res.send(err);
	    res.json(task);
	});
  
};
exports.getCategories = function(req, res) {
	   var perPage = 10;
    var page = req.query.pageNo || 1
    Category
        .find({})
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, Categories) {
             Category.count().exec(function(err, response) {
                 if (err) return next(err)
			 res.json({Categories:Categories,totalcount:response});
            })
        })  
  
};
exports.removeCategory=function(req,res){
  Category.remove( { _id : req.body._id } ,function(err,data){
     if (err)
        res.send(err);
      res.json(data);
  })
}
exports.updateCategory=function(req,res){

  Category.update({_id:req.body._id},
      req.body,function(err,data){
        if (err)
        res.send(err);
      res.json(data);
      })
}