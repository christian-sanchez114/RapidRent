'use strict';
angular.module('sbAdminApp')
  .controller('ProfileCtrl', function($scope,$position,$http,appService,$rootScope) {
    console.log('ProfileCtrl');
    var vm = this;
    vm.success=false;
    vm.updateProfile= function()
    {
      $http.post('/api/updateUser',  vm.user)
      .then(function(data) {
          //  vm.user={};
          vm.success=true;
      })
      .catch(function(data) {
         delete $window.sessionStorage.token;
          console.log('Error: ' + data);
      });
    }

    vm.getLogedinUserDetails=function()
    {
    //  var user=appService.getUserData();
     //$rootScope.user=user;
    //  vm.user=angular.copy(user);
    //  console.log('loginuser',vm.user);
     
    vm.userid=window.sessionStorage.user;
     $http.get('/api/getuserbyid?_id='+vm.userid)
      .then(function(data) {
        console.log('profile:',data)
           vm.user=data.data[0];
      })
      .catch(function(data) {
         delete $window.sessionStorage.token;
          console.log('Error: ' + data);
      });
     
    }
    vm.getLogedinUserDetails();
  });
