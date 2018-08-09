'use strict';

angular.module('sbAdminApp')
	.directive('notifications',function(){
		return {
        templateUrl:'core/directives/notifications/notifications.html',
        restrict: 'E',
        replace: true,
    	}
	});


