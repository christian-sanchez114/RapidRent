'use strict';

angular.module('sbAdminApp')
  .controller('categoriesCtrl', function($scope,$position,$http,$modal) {
     var vm = this;
   vm.Categories=[];
    vm.createCategory=function(){
     $http.post('/api/category',  vm.category)
        .then(function(data) {
             vm.category={};
            if (data.created) {
                console.log('category created successfully')
            }else{
              vm.message = data.data.message;
              vm.getAllCategory();
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }

    
  vm.showModal = function(obj,ev){
    var modalInstance = $modal.open({
       templateUrl: 'modules/categorymanagement/views/categoryDetail.html',
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

    vm.updateCategory=function(){
        $http.post('/api/updateCategory',  vm.category)
           .then(function(data) {
                vm.category={};
            //    if (data.created) {
            //        console.log('category Update successfully')
            //    }else{
                 vm.message = data.data.message;
                 vm.getAllCategory();
                 vm.updatebtn=false;
            //  }
           })
           .catch(function(data) {
               console.log('Error: ' + data);
           });
       }

    vm.updatebtn=false;
    vm.editCategory=function(item){
        vm.category={'name':item.name,'description':item.description,'_id':item._id}
        console.log('cat',vm.category);
        vm.updatebtn=true;
       }
    
       $scope.totalItemsrecord = 0;
    vm.getAllCategory=function(currentPage){
        $http.get('/api/category?pageNo='+currentPage)
        .then(function(data) {
            if (data) {
                vm.Categories=data.data.Categories;
                $scope.totalItemsrecord=data.data.totalcount;
            }else{
              vm.message = data.data.message;
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
        vm.getAllCategory(currentPage);
    };
    $scope.currentPage = 1;
    $scope.pageChanged($scope.currentPage);
    
    $scope.maxSize = 5;



    vm.removeCategory=function(category){
     $http.post('/api/removeCategory',  {_id:category._id})
        .then(function(data) {
            if (data.created) {
                console.log('category removed successfully')
            }else{
              vm.message = data.data.message;
              vm.getAllCategory();
          }
        })
        .catch(function(data) {
            console.log('Error: ' + data);
        });
    }
    //vm.getAllCategory()
  });
  angular.module('sbAdminApp').directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure?";
                var clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
}]);

angular.module('sbAdminApp').controller("ModalDialogController", function ($scope, $modalInstance, items,$http) {
    $scope.category=items;
    console.log('$scope.category',$scope.category);
    $scope.disable=true;
    $scope.updatebtn=true;
    $scope.updateCategory=function(){
        console.log('$scope.category',$scope.category);

        $http.post('/api/updateCategory',  $scope.category)
           .then(function(data) {
                // $scope.category={};
                //  $scope.message = data.data.message;
                //  $scope.getAllCategory();
                $scope.categoryupdate=true;
            //  }
            $modalInstance.dismiss('cancel');
           })
           .catch(function(data) {
               console.log('Error: ' + data);
           });
       }


    $scope.ok = function () {
      $modalInstance.close();
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });