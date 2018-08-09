'use strict';

angular.module('rrapp')
  .controller('userprofileCtrl', function($scope,$http,$state,$window,Upload,$rootScope) {
     var vm = this;
    //  $scope.logdata={
    //     token:window.localStorage.getItem("token"),
    //     user:window.localStorage.getItem("user"),
    //     status:window.localStorage.getItem("status")
    //    }
  
     $scope.files = [];
   $scope.getLogedinUserDetails=function()
   {
   $scope.userid=window.localStorage.getItem("user");
    $http.get('/api/getuserbyid?_id='+$scope.userid)
     .then(function(data) {
       console.log('profile:',data)
          $scope.userdetail=data.data[0];
          $rootScope.userdetail=data.data[0];
          window.localStorage.setItem("userName",data.data[0].userName);
     })
     .catch(function(data) {
        delete $window.sessionStorage.token;
         console.log('Error: ' + data);
     });
    
   }

   $scope.getProductList=function()
   {

    $http.get('/api/items')
     .then(function(data) {
       console.log('productList:',data)
          $scope.productList=data.data;
     })
     .catch(function(data) {
         console.log('Error: ' + data);
     });
    
   }
$scope.getProductList();
   $scope.changePassword= function()
   {

     $scope.data =  {
           _id     : window.localStorage.getItem("user"),
           password  : $scope.user.oldpassword,
           newPassword:$scope.user.newpassword
     }
     $http.post('/api/change_password', $scope.data)
         .then(function(data) {
            $scope.successMessage=true;
            $scope.errorMessage=false;
            $scope.user='';
            $scope.changemessage='Your password changed successfully';
         })
         .catch(function(data) {
             console.log('Error: ' + data);
         });
      
   }

  

   $scope.updateProfileDetail = function(profileData){
    $http.post('/api/updateUser',  $scope.userdetail)
    .then(function(data) {
      console.log('data',data);
         $scope.logindata={};
         $scope.message="User info. Update Successfully";
    })
    .catch(function(data) {
        console.log('Error: ' + data);
    });
   }

   $scope.getLogedinUserDetails();
   $scope.logincheck= function(logindata) {  
    $http.post('/api/login',  logindata)
    .then(function(data) {
      console.log('data',data);
         $scope.logindata={};
    })
    .catch(function(data) {
      delete $window.sessionStorage.token;
        console.log('Error: ' + data);
    });
  }



jQuery('.ctmheader').css('display','none');
$scope.changeUserPassword = function(){
    $http.post('/api/changepassword',  $scope.userdetail)
    .then(function(data) {
      console.log('data',data);
         $scope.logindata={};
    })
    .catch(function(data) {
        console.log('Error: ' + data);
    });
   }

$scope.val= false;
$scope.profilePasswordWindowChange =function(clickName){
    if(clickName=="home"){
      jQuery('#v-pills-home-tab').addClass('active');
      jQuery('#v-pills-profile-tab').removeClass('active');
      jQuery('#v-pills-home').css('display','block');   
      jQuery('#v-pills-profile').css('display','none');
    } else if(clickName=="productlist"){
        jQuery('#v-pills-productlist-tab').addClass('active');
        jQuery('.productlistadd').removeClass('active');
        jQuery('.formProductlist').removeClass('show');
        jQuery('#v-pills-productlist').css('display','block');
        jQuery('.formProductlist').css('display','none');   
        jQuery('#v-pills-productlist').addClass('show');   
        $scope.getProductList();
    }else if(clickName=="addproduct"){
        jQuery('.formProductlist').css('display','block');
        jQuery('#v-pills-productlist').css('display','none');
        jQuery('#v-pills-productlist').removeClass('show'); 
        jQuery('.productlistadd').addClass('active');
        jQuery('.formProductlist').addClass('show');
        jQuery('.formProductlist').addClass('show');
        jQuery('#v-pills-productlist-tab').removeClass('active');
        $scope.removeproductmsg();
    }else{
      jQuery('#v-pills-home-tab').removeClass('active');
      jQuery('#v-pills-profile-tab').addClass('active');
      jQuery('#v-pills-profile').addClass('active');
      jQuery('#v-pills-profile').addClass('show'); 
      jQuery('#v-pills-home').css('display','none');   
      jQuery('#v-pills-profile').css('display','block');   
      
    }
  }
$scope.userdataprofile= function(valId){
    //$scope.val =!val;
    if(valId=='pills-home'){
        jQuery('#pills-profile').addClass('show');
        jQuery('#pills-home').removeClass('show');
        jQuery('#pills-home').css('display','none');
        jQuery('#pills-profile').css('display','block');
        jQuery('#pills-productlist').css('display','none');
    } else if(valId=='pills-productlist') {

        jQuery('#pills-home').css('display','none');
        jQuery('#pills-profile').css('display','none');
        jQuery('#pills-productlist').css('display','block');
        jQuery('#pills-productlist').addClass('show');
    } else {
        
        jQuery('#pills-profile').removeClass('show');
        jQuery('#pills-home').addClass('show');
        jQuery('#pills-profile').css('display','none');
        jQuery('#pills-home').css('display','block');
        jQuery('#pills-productlist').css('display','none');
    }
}
$scope.userdataprofile('pills-profile');


$scope.addproduct=function(product){
  console.log(product)
  product.userid=$rootScope.loginDetail.user;
  if ($scope.files.length) {
      Upload.upload({
          url: '/api/items',
          method: 'POST',
          arrayKey: '',
          data: {
              files: $scope.files,
              data: product
          }
      }).then(function (response) {
          // $timeout(function () {
              $scope.result = response.data;
              $scope.product={};
              $scope.addproductmsg="Product added Successfully";
          // });
      }, function (response) {
          if (response.status > 0) {
              $scope.errorMsg = response.status + ': ' + response.data;
          }
      }, function (evt) {
          $scope.progress = 
              Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
  }
}


$scope.uploadFiles = function (files) {
        $scope.files = files;
};




$scope.totalItemsrecord = 0;
$scope.getAllCategory=function(currentPage){
    $http.get('/api/category?pageNo='+currentPage)
    .then(function(data) {
        if (data) {
            $scope.Categories=data.data.Categories;
            $scope.totalItemsrecord=data.data.totalcount;
        }else{
          $scope.message = data.data.message;
      }
    })
    .catch(function(data) {
        console.log('Error: ' + data);
    });
}

$scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
};

$scope.pageChanged = function(currentPage) {
    $scope.getAllCategory(currentPage);
};
$scope.currentPage = 1;
$scope.pageChanged($scope.currentPage);

$scope.maxSize = 5;

    $scope.removeItems=function(productid){
     $http.post('/api/removeItems',  {_id:productid})
        .then(function(data) {
            if (data.created) {
                console.log('category removed successfully')
            }else{
              $scope.removeproductmsg = "Product Remove successfully";
              $scope.getProductList();
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }

    if(window.localStorage.getItem("role")=="lander"){
        $scope.id='landerId';
    }else{
        $scope.id='renterId';
    }

    $scope.bookinglist=function(){
        $http.get('/api/getBookingsById?'+$scope.id+'='+window.localStorage.getItem("user"))
        .then(function(data) {
            if (data) {
                $scope.bookinglist=data.data;
                // $scope.totalItemsrecord=data.data.totalcount;
            }else{
              $scope.message = data.data.message;
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }
    $scope.bookinglist();

    // $scope.getAllCategory()
  });
