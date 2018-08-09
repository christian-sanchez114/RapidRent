'use strict';
angular.module('sbAdminApp')
  .controller('chnagePasswordCtrl', function($scope,$position,$http,appService) {
    var vm = this;
    vm.user={};
    vm.changePassword= function()
    {
      if(vm.user.newpassword == vm.user.usercpassword){
      vm.data =  {
            _id     : window.sessionStorage.user,
            password  : vm.user.oldpassword,
            newPassword:vm.user.newpassword,
            cpassword:vm.user.usercpassword
      }
      $http.post('/api/change_password', vm.data)
          .then(function(data) {
            vm.successMessage=true;
            vm.errorMessage=false;
            vm.user='';
          })
          .catch(function(data) {
              console.log('Error: ' + data);
          });
        }else{
          vm.errorMessage=true;
        }
    }
    vm.getLogedinUserDetails=function()
    {
     var userdata=appService.getUserData();
     vm.user.userid=userdata._id
    }
    vm.getLogedinUserDetails();
  });
