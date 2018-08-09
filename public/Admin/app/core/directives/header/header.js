'use strict';

angular.module('sbAdminApp')
	.directive('header',function(){
		return {
        templateUrl:'core/directives/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


