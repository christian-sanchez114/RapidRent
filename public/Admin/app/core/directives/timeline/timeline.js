'use strict';
angular.module('sbAdminApp')
	.directive('timeline',function() {
    return {
        templateUrl:'core/directives/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
