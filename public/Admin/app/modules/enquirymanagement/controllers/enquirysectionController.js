'use strict';
angular.module('sbAdminApp')
  .controller('enquirySectionCtrl', function($scope,$position,$http, $modal,$rootScope) {
   var vm = this;
   vm.activereplysection=false;
   vm.editTabactive=false;


  vm.showModal = function(obj,ev){
       var modalInstance = $modal.open({
          templateUrl: 'modules/enquirymanagement/views/enquiryDetail.html',
          controller: 'ModalDialogController', 
          scope: $scope,
          resolve: {
            items: function () {
              return obj;
            }
          }
     })
        .result.then(
            function () {
            // alert("OK");
            }, 
            function () {
                //alert("Cancel");
            }
        );
     }
     $scope.totalItemsrecord = 0;
    vm.getEnquiry=function(currentPage){
      vm.enquiries=[]
      $http.get('/api/enquiry?pageNo='+currentPage)
     .then(function(data) {
         if (data) {
             console.log(data);
             vm.enquiries=data.data.EnquiryData;
             $scope.totalItemsrecord=data.data.totalcount;
         }else{
           vm.message = data.data.message;
       }
     })
     .catch(function(data) {
         console.log('Error: ' + data);
     });
    }
  //vm.getEnquiry();
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
};

$scope.pageChanged = function(currentPage) {
    vm.getEnquiry(currentPage);
};
$scope.currentPage = 1;
$scope.pageChanged($scope.currentPage);

$scope.maxSize = 5;

  vm.diableinput=false;
   vm.viewdetail= function(obj){
       vm.detailTab=true;
       vm.editTabactive=true;
       vm.diableinput=true;
       //vm.user=obj;
      showModal(obj);
    }
   vm.backTolist= function(){
       vm.detailTab=false;
       vm.editTabactive=false;
       vm.activereplysection=false;
    }
   vm.userReply =function(){
       vm.detailTab=true;
       vm.activereplysection=true;
       vm.editTabactive=false;
    }
  });
  angular.module('sbAdminApp').controller("ModalDialogController", function ($scope, $modalInstance, items) {
    
    $scope.user=items;
   
    $scope.ok = function () {
      $modalInstance.close();
    };
  
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });