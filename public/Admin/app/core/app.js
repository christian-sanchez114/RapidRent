'use strict';

angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'modules/dashboard/views/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'core/directives/header/header.js',
                    'core/directives/header/header-notification/header-notification.js',
                    'core/directives/sidebar/sidebar.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["assets/bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "assets/bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['assets/bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['assets/bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['assets/bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['assets/bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['assets/bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        templateUrl:'modules/dashboard/views/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'modules/dashboard/controllers/main.js',
              'core/directives/notifications/notifications.js',
              'core/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
     
          .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'modules/loginmangement/views/login.html',
        url:'/login',
        controller:'LoginCtrl',
        controllerAs: 'vm',
  resolve: {
    loadMyFile:function($ocLazyLoad) {
      return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:['modules/loginmangement/controllers/loginContoller.js']
      })
    }
  }
    })
    .state('dashboard.profile',{
      templateUrl:'modules/profilemangement/views/profile.html',
      url:'/userprofile',
      controller: 'ProfileCtrl',
      controllerAs: 'vm',
    resolve: {
    loadMyFile:function($ocLazyLoad) {
      return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:['modules/profilemangement/controllers/userProfile.js']
      })
    }
  }
  })
  .state('dashboard.userManagement',{
    templateUrl:'modules/usermanagement/views/userManagement.html',
    url:'/userManagement',
    controller: 'userManagementCtrl',
    controllerAs: 'vm',
    resolve: {
      loadMyFile:function($ocLazyLoad) {
        return $ocLazyLoad.load({
            name:'sbAdminApp',
            files:['modules/usermanagement/controllers/usermanagementController.js']
        })
      }
    }
})

  .state('dashboard.addCategories',{
    templateUrl:'modules/categorymanagement/views/addCategories.html',
    url:'/addCategories',
    controller: 'categoriesCtrl',
    controllerAs: 'vm',
    resolve: {
      loadMyFile:function($ocLazyLoad) {
        return $ocLazyLoad.load({
            name:'sbAdminApp',
            files:['modules/categorymanagement/controllers/categoriesController.js']
        })
      }
    }
})
.state('dashboard.bookinglist',{
  templateUrl:'modules/bookingmangement/views/bookingManagement.html',
  url:'/bookinglist',
  controller: 'bookingManagementCtrl',
  controllerAs: 'vm',
  resolve: {
    loadMyFile:function($ocLazyLoad) {
      return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:['modules/bookingmangement/controllers/bookingmanagementController.js']
      })
    }
  }
})

.state('dashboard.enquirySection',{
  templateUrl:'modules/enquirymanagement/views/enquirySection.html',
  url:'/enquirySection',
  controller: 'enquirySectionCtrl',
  controllerAs: 'vm',
  resolve: {
    loadMyFile:function($ocLazyLoad) {
      return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:['modules/enquirymanagement/controllers/enquirysectionController.js']
      })
    }
  }
})

  
  .state('dashboard.changepassword',{
    templateUrl:'modules/loginmangement/views/changePassword.html',
    url:'/changepassword',
    controller: 'chnagePasswordCtrl',
    controllerAs: 'vm',
  resolve: {
    loadMyFile:function($ocLazyLoad) {
      return $ocLazyLoad.load({
          name:'sbAdminApp',
          files:['modules/loginmangement/controllers/changePassword.js']
      })
    }
   }
 })
    .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
     
  }])
.run(['$state','$window', '$rootScope', function($state,$window, $rootScope) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
console.log('toState',toState.name,fromState);
  if(toState.name=='login')
      { 
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
      }
      if(toState.name !='login' && $window.sessionStorage.token ==undefined){
        $state.go('login');
       }
    });
}]);

    
