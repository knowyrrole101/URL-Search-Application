//Angular Style Guide - John Papa
(function() {
  'use strict'
  angular
    .module('app')
    .config(config)
    .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    //run.$inject = ['$rootScope', '$state', 'Auth'];

    function config($stateProvider, $urlRouterProvider, $locationProvider){
      $stateProvider
        .state('home', {
          url:'/',
          templateUrl: 'partials/home.html',
          controller: 'homeController'
        })
        .state('login', {
          url:'/login',
          templateUrl: 'partials/login.html',
          controller: 'loginController'
        })
        .state('register', {
          url:'/register',
          templateUrl: 'partials/register.html',
          controller: 'registerController'
        })
        .state('add', {
          url:'/add',
          templateUrl: 'partials/addSite.html',
          controller: 'addSiteController',
          restricted: true
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }

    function run($rootScope, $state, Auth){
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if(toState.restricted && Auth.isLoggedIn()===false){
          $state.go('login')
          event.preventDefault();
        }
      });
    }

})();
