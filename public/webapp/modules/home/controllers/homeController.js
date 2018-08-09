'use strict';

angular.module('rrapp')
  .controller('homeCtrl', function($scope,$http,$state,$window,$timeout,$rootScope) {
     var vm = this;
   console.log('homeCtrl');
   $scope.username=window.localStorage.getItem("userName");
   
  // if($rootScope.loginDetail){
  //   $scope.userid=$rootScope.loginDetail.user;
  // }
 
   $scope.productList = [
    { name: "Android Mobile", price: "$3.00 a Day",image:"img13.png" },
    { name: "Apple Iphone 10 64GB", price: "$4.00 a Day",image:"img14.png" },
    { name: "HP i5 Laptop", price: "$5.00 a Day",image:"img17.png" },
    { name: "Canon DSLR Camera", price: "$3.00 a Day",image:"img4.png" },
    { name: "LG Android TV", price: "$3.00 a Day",image:"img19.png" },
    { name: "Reebok Footboll", price: "$3.00 a Day",image:"img12.png" },
    { name: "Duck Bike", price: "$3.00 a Day",image:"img9.png" },
    { name: "MRF BAT", price: "$3.00 a Day",image:"img7.png" }
  ];


  
   jQuery('.ctmheader').css('display','block');
$scope.dataDisplay="something somthing";
   $scope.logincheck= function(logindata) {  
    $http.post('/api/login',  logindata)
    .then(function(data) {
      console.log('data',data);
         $scope.logindata={};
         
        if (data.data.status=='Logged in') {
        //  $window.sessionStorage.token = data.data.token;
        //  $window.sessionStorage.user = data.data.user;
         window.localStorage.setItem("token", data.data.token);
         window.localStorage.setItem("user", data.data.user);
         window.localStorage.setItem("status", data.data.status);
         window.localStorage.setItem("role", data.data.role);
         jQuery('#myModal').modal('hide');
        $state.go('userprofile',{status:data.data.status})
      }else{
        $scope.loginmessage =  "Sorry! You have entered an invalid username or password.";
      }
    })
    .catch(function(data) {
      $scope.loginmessage =  "Sorry! You have entered an invalid username or password.";
delete $window.sessionStorage.token;
        console.log('Error: ' + data);
    });
}


$scope.logOut = function() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("status");
  $rootScope.loginDetail={};
  $state.go('home');
};


$scope.pageChangedBycat = function(catid) {
  $state.go('product',{categoryId:catid})
};

$scope.removeacitveWindow= function() {
  //jQuery('#modal').removeClass('show');
  jQuery('#myModal').css('display','none');
  $timeout(function () {
  jQuery('#myModal22').css('display','none');
  },200);
  $scope.passwordhidden= false;
}


$scope.passwordhidden= false;
$scope.forgetpassword = function() {
  $scope.passwordhidden= true;
}
$scope.logincheckactive= function() {
  $scope.passwordhidden= false;
  jQuery('#myModal22').css('display','none');

  $timeout(function () {
  jQuery('#myModal').css('display','block');
  jQuery('#myModal').addClass('show');
  },500);
}

$scope.registerUser= function(data) {  
  if(data.password==data.cpassword){
  $http.post('api/register',  data)
  .then(function(data) {
    console.log('getdata',data);
    jQuery('#myModal22').modal('hide');
        $state.go('home');
        $scope.Signup={};
        //$scope.registrationmessage="Your registration create successfully";
  })
  .catch(function(data) {
    $scope.registrationmessage="Someting went worng";
//delete $window.sessionStorage.token;
      console.log('Error: ' + data);
  });
}
}


$scope.totalItemsrecord = 0;
$scope.getAllCategory=function(currentPage){
    $http.get('/api/category?pageNo='+currentPage)
    .then(function(data) {
        if (data) {
            $scope.Categories=data.data.Categories;
            angular.forEach($scope.Categories, function (item) {
              console.log('itemname',item.name);
              })
            console.log('$scope.Categories',$scope.Categories);
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

  });
