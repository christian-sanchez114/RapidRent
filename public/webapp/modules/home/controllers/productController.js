'use strict';

angular.module('rrapp')
  .controller('productCtrl', function($scope,$rootScope,$http,$state,$window,$timeout,$stateParams) {
     var vm = this;
   console.log('productCtrl');
  //  $scope.userid=$window.sessionStorage.user;
   $scope.categoryId=$stateParams.categoryId;
   if($stateParams.categoryId){
    window.localStorage.setItem("categoryId", $stateParams.categoryId);
   }
   
   jQuery('.ctmheader').css('display','none');


   $scope.totalItemsrecord = 0;
$scope.getproductBycategory = function(currentPage,catid){
  $http.get('api/getItemsByCategory?pageNo='+ currentPage +'&categoryId='+ catid)
  .then(function(data) {
    console.log('final',data);
    $scope.totalItemsrecord=data.data.items.length;
    $scope.Itemsrecordlist=data.data.items;
    
  
  })
  .catch(function(data) {
    $scope.registrationmessage="Someting went worng";
      console.log('Error: ' + data);
  });
}

$scope.setPage = function (pageNo) {
  $scope.currentPage = pageNo;
};
$scope.currentPage = 1;

$scope.maxSize = 5;

if($scope.categoryId){
    $scope.getproductBycategory($scope.currentPage,$scope.categoryId);

}else{
    $scope.getproductBycategory($scope.currentPage,window.localStorage.getItem("categoryId"));
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


$scope.checkLoginStauts = function(){
  $rootScope.LoginStauts="You are not logged in. please login and try again for booking";
}
$scope.productDetail = function(catid) {
    $state.go('productDetail',{productId:catid})
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
$scope.bookedmsg="";
$scope.productBooked= function(item){
  item.renterId=window.localStorage.getItem("user");
  item.landerId=item.userId;
console.log('item',item);
$http.post('/api/createBookings', item)
.then(function(data) {
   $scope.successMessage=true;
   $scope.errorMessage=false;
   $scope.user='';
   $scope.bookedmsg='Your Booking request send successfully';
})
.catch(function(data) {
    console.log('Error: ' + data);
});

}
  });
