var app = angular.module('starter', ['ionic', 'ngCordova','starter.controllers']);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

  .state('home', {
    url: '/home',
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
    templateUrl: 'templates/myrequests.html',
    controller: 'myrequestsCtrl'
  })
  .state('account', {
    url: '/account',
    templateUrl: 'templates/account.html',
    controller: 'accountCtrl'
  });
});
