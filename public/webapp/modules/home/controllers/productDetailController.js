'use strict';

angular.module('rrapp')
  .controller('productDetailCtrl', function($scope,$rootScope,$http,$state,$window,$timeout,$stateParams) {
     var vm = this;
   console.log('productDetailCtrl');
  //  $scope.userid=$window.sessionStorage.user;
   $scope.productId=$stateParams.productId;
   if($stateParams.productId){
    window.localStorage.setItem("productId", $stateParams.productId);
   }
   
   jQuery('.ctmheader').css('display','none');


   $scope.totalItemsrecord = 0;
$scope.getproductDetail = function(currentPage,productid){
  $http.get('api/getItemById?_id='+productid)
  .then(function(data) {
    console.log('finalproductid',data);
    // $scope.totalItemsrecord=data.data.length;
    $scope.Itemsrecordlist=data.data[0];
    
  
  })
  .catch(function(data) {
    $scope.registrationmessage="Someting went worng";
      console.log('Error: ' + data);
  });
}
$scope.checkLoginStauts = function(){
  $rootScope.LoginStauts="You are not logged in. please login and try again for booking";
}
$scope.setPage = function (pageNo) {
  $scope.currentPage = pageNo;
};
$scope.currentPage = 1;

$scope.maxSize = 5;

if($scope.productId){
  $scope.getproductDetail($scope.currentPage,$scope.productId);

}else{
  $scope.getproductDetail($scope.currentPage,window.localStorage.getItem("productId"));
}

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



$scope.removeacitveWindow= function() {
  //jQuery('#modal').removeClass('show');
  jQuery('#myModal').css('display','none');
  $timeout(function () {
  jQuery('#myModal22').css('display','none');
  },200);
  $scope.passwordhidden= false;
}

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

$scope.bookingDetailmsg="";
$scope.productBooked= function(item){
  item.renterId=window.localStorage.getItem("user");
  item.landerId=item.userId;
  $http.post('/api/createBookings', item)
  .then(function(data) {
     $scope.successMessage=true;
     $scope.errorMessage=false;
     $scope.user='';
     $scope.bookingDetailmsg='Your Booking request send successfully';
  })
  .catch(function(data) {
      console.log('Error: ' + data);
  });
  
  }


  });
