'use strict';

angular.module('sbAdminApp')
  .factory('appService', function() {
   var service={   };
   var userData={};
   service.getUserData=function(){
    return userData;
   }
   service.setUserData=function(data){
    userData=data;
   }
    return service;
  });
