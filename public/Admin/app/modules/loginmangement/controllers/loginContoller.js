'use strict';

angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope,$http,$state,$window,appService) {
   var vm = this;
     vm.logincheck= function() {  
            $http.post('/api/login',  vm.user)
            .then(function(data) {
                 vm.user={};
                if (data.data.status=='Logged in') {
                 $window.sessionStorage.token = data.data.token;
                 $window.sessionStorage.user = data.data.user;
                 appService.setUserData(data.data.user)
                $state.go('dashboard.home',{status:data.data.status})
              }else{
                  //vm.message = data.data.message;
                  vm.message =  "Sorry! You have entered an invalid username or password.";
              }
            })
            .catch(function(data) {
        delete $window.sessionStorage.token;
                console.log('Error: ' + data);
            });
    }
    
  });
