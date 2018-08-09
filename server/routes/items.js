'use strict';
var mongoose = require('mongoose'),
  Items = mongoose.model('Items');

exports.createItems = function(req, res) {
  var newItems = {
    name            : req.body.name,
    description     : req.body.description,
    price       : req.body.price,
    startDate   : req.body.startDate,
    endDate     : req.body.endDate,
    created     :new Date(),
    modified    :new Date(),
    status      :req.body.status,
    categoryId    :req.body.categoryId,
    userId      :req.body.userId 
  },
  new_Items=Items(newItems);
	new_Items.save(function(err, task) {
	    if (err)
	      res.send(err);
	    res.json(task);
	});
  
};

exports.getItems = function(req, res) {
  Items.find(function(err, data) {
      if (err)
        res.send(err);
      res.json(data);
  });
  
};
exports.removeItems=function(req,res){
  Items.remove( { _id : req.body._id } ,function(err,data){
     if (err)
        res.send(err);
      res.json(data);
  })
}
exports.updateItems=function(req,res){
  Items.update({_id:req.body._id},
      req.body,function(err,data){
        if (err)
        res.send(err);
      res.json(data);
  })
}
exports.getItemsByCategory=function(req,res){


   var perPage = 10;
    var page = req.query.pageNo || 1
    Items
        .find({categoryId:req.query.categoryId})
        .sort({created: -1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, items) {
             Items.count().exec(function(err, response) {
                 if (err) return next(err)
			 res.json({items:items,totalcount:response});
            })
        })  
}
exports.getItemById=function(req,res){
  Items.find({_id:req.query._id},function(err,result){
    if (err)
        res.send(err);
      res.json(result);
  })
}