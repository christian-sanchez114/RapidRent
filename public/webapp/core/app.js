'use strict';

angular
  .module('rrapp', [
    'oc.lazyLoad',
    'ui.router',
    'ngFileUpload'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/home');

    $stateProvider

      .state('home', {
        url:'/home',
        controller:'homeCtrl',
        controllerAs: 'vm',
        templateUrl: '../webapp/modules/home/views/main.html',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'rrapp',
                files:[]
            })
          }
        }
       }) 
       .state('userprofile', {
        url:'/userprofile',
        templateUrl: '../webapp/modules/home/views/profile.html',
        controller:'userprofileCtrl',
        controllerAs: 'vm',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'rrapp',
                files:['../webapp/modules/home/controllers/userprofileController.js']
            })
          }
        }
      })
      .state('product', {
        url:'/product',
        templateUrl: '../webapp/modules/home/views/product.html',
        controller:'productCtrl',
        controllerAs: 'vm',
        params : {
          categoryId:null
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'rrapp',
                files:['../webapp/modules/home/controllers/productController.js']
            })
          }
        }
      })

      .state('productDetail', {
        url:'/productDetail',
        templateUrl: '../webapp/modules/home/views/productDetail.html',
        controller:'productDetailCtrl',
        controllerAs: 'vm',
        params : {
          productId:null
        },
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
                name:'rrapp',
                files:['../webapp/modules/home/controllers/productDetailController.js']
            })
          }
        }
      })

     
  }])
  .run(['$state','$window', '$rootScope', function($state,$window, $rootScope) {
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    console.log('toState',toState.name,fromState);

    if(window.localStorage.getItem("token")){
      $rootScope.loginDetail={
        token:window.localStorage.getItem("token"),
        user:window.localStorage.getItem("user"),
        userName:window.localStorage.getItem("userName"),
        role:window.localStorage.getItem("role"),
        status:true
       }
     }else if(toState.name !='home'){
      $rootScope.loginDetail={
        token:null,
        user:null,
        status:false
       }
       $state.go('home');
       }

    // if(toState.name=='home')
    //   { 
        
    //     delete $window.sessionStorage.token;
    //     delete $window.sessionStorage.user;

    //   }
    //   if(toState.name !='home' && $window.sessionStorage.token ==undefined){

      //  }
    });
}]);
    
