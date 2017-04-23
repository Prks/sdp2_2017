var app = angular.module('starter', ['ionic', 'ngCordova','starter.controllers','starter.services']);

app.config(function($stateProvider, $urlRouterProvider) {



  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })
  .state('home', {
    url: '/home',
    cache: false,
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })
  .state('newrequest', {
    url: '/newrequest',
    templateUrl: 'templates/newrequest.html',
    controller: 'newrequestCtrl'
  })
  .state('myrequests', {
    url: '/myrequests',
    cache: false,
    templateUrl: 'templates/myrequests.html',
    controller: 'myrequestsCtrl'
  })
  .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'accountCtrl'
  })
    .state('deliverer', {
    url: '/deliverer',
    templateUrl: 'templates/deliverer.html',
    controller: 'delivererCtrl'
  });

   $urlRouterProvider.otherwise('/login');
});
