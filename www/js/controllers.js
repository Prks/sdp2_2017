var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope){

    $scope.sampleaccount = [
      { name: 'Bob', address: 'some streetaddress', email: 'some@email.com', phone:'1234578'}
    ]

  });

app.controller('homeCtrl', function($scope){

    $scope.expand = true;

    $scope.examples = [
      { title: 'Sample 1 ', description: 'This is description 1'},
      { title: 'Sample 2', description: 'This is description 2'},
      { title: 'Sample 3', description: 'This is description 3'},
    ];

  });

app.controller('newrequestCtrl', function(){

  });

app.controller('myrequestsCtrl', function($scope){

    $scope.expand = true;


    $scope.myexamples = [
      { title: 'My Sample 1 ', description: 'This is description 1'},
      { title: 'My Sample 2', description: 'This is description 2'},
    ];
  });
