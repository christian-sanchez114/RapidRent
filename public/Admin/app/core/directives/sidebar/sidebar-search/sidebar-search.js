'use strict';

angular.module('sbAdminApp')
  .directive('sidebarSearch',function() {
    return {
      templateUrl:'core/directives/sidebar/sidebar-search/sidebar-search.html',
      restrict: 'E',
      replace: true,
      scope: {
      },
      controller:function($scope){
        $scope.selectedMenu = 'home';
      }
    }
  });
