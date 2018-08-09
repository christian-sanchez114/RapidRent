'use strict';

angular.module('sbAdminApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'core/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


