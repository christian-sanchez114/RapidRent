'use strict';
angular.module('sbAdminApp')
  .controller('MainCtrl', function($scope,$position,$http) {
    console.log('login');
    var vm = this;
    vm.getEnquiry=function(){
        vm.enquiries=[]
        $http.get('/api/recentEnquiries')
       .then(function(data) {
           if (data) {
               console.log(data);
               vm.enquiries=data.data;
           }else{
             vm.message = data.data.message;
         }
       })
       .catch(function(data) {
           console.log('Error: ' + data);
       });
      }
    vm.getEnquiry();
 vm.find10users=function(){
  $http.get('/api/recentUsers')
     .then(function(data) {
         if (data) {
             console.log('hfsdhfs',data);
             vm.usersregister=data.data;
         }else{
           vm.message = data.data.message;
       }
     })
     .catch(function(data) {
         console.log('Error: ' + data);
     });
 }
 vm.find10users();
 // vm.getusers();

  });
