var router = require('express').Router(),
	user = require('./user'),
    category = require('./category'),
    enquiry = require('./enquiry'),
    email=require('./email'),
	items = require('./items')
    mongoose = require('mongoose'),
    Items = mongoose.model('Items'),
    bookings=require('./bookings');
var path = require('path');
var multer  = require('multer')

var storage = multer.diskStorage({
      destination: './public/uploads/',
      filename: function (req, file, cb) {
        cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
      }
    })

var upload = multer({ storage: storage })
  // user Routes
  router
    .post('/register',user.create_a_user)
    .post('/login',user.authenticate)
    .post('/forgot_password',user.forgot_password)
    .post('/removeUser',user.remove_a_user)
    .post('/active_inactive_a_user',user.active_inactive_a_user)
    .get('/find10users',user.find10users)
    .post('/updateUser',user.update_a_user)
    .get('/getusers',user.getusers)
	.get('/getuserbyid',user.getuserbyid)
    .post('/reset_password',user.reset_password)
    .post('/change_password',user.change_password)
    .post('/token',user.token)
    .post('/email',email.send)
    .get('/verify',email.verify)
    .get('/recentUsers',user.recentUsers)
    .post('/category',category.createCategory)
    .post('/removeCategory',category.removeCategory)
    .post('/updateCategory',category.updateCategory)
    .get('/category',category.getCategories)
    //.post('/items',items.createItems)
    .post('/items', upload.array('files'), function (req, res, next) {
        
        var images=[];
        if(req.files.length>0){
            for (var i = 0; i < req.files.length; i++) {
                images.push({filename:req.files[i].filename,originalname:req.files[i].originalname,path:req.files[i].path});
            }
        }
        var newItems = {
        name        : req.body.data.name,
        description : req.body.data.description,
        price       : req.body.data.price,
        startDate   : req.body.data.startDate,
        endDate     : req.body.data.endDate,
        created     : new Date(),
        modified    : new Date(),
        files       : images,
        status      : req.body.data.status,
        categoryId  : req.body.data.categoryId,
        userId      : req.body.data.userid 
      },
      new_Items=Items(newItems);
        new_Items.save(function(err, task) {
            if (err)
              res.send(err);
            res.json(task);
        });
    })
    .get('/items',items.getItems)
    .get('/getItemsByCategory',items.getItemsByCategory)
    .get('/getItemById',items.getItemById)
    .post('/removeItems',items.removeItems)
    .post('/updateItems',items.updateItems)
    .post('/enquiry',enquiry.createEnquiry)
    .get('/enquiry',enquiry.getEnquiries)
    .get('/recentEnquiries',enquiry.recentEnquiries)
    .post('/createBookings',bookings.createBookings)
    .get('/getBookings',bookings.getBookings)
    .get('/getBookingsById',bookings.getBookingsById)
    .post('/accept_reject',bookings.accept_reject);



module.exports = router;