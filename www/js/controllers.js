var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope){

    $scope.sampleaccount = [
      { name: 'Bob', email: 'some@email.com', phone:'1234578'}
    ]

  });

app.controller('loginCtrl', function(){

  });

app.controller('registerCtrl', function(){

  });

app.controller('homeCtrl', function($scope, $ionicModal){

    $scope.expand = true;

    $scope.examples = [
      { title: 'Title 1 ', description: 'Here goes the full description 1', address: 'someaddress 1', dest_address: 'the destination address 1', delivered_before: '14:00', payment: '10€'},
      { title: 'Title 2', description: 'This is description 2'},
      { title: 'Title 3', description: 'This is description 3'},
    ];

    $scope.Modalopen = function(example){
      $scope.example = example;
      $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/modal-template.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.Modalclose = function(){
      $scope.moda.hide();
    }

});

app.controller('mdlCtrl', function($scope){
  $scope.Modalhide = function(){
    $scope.mdlCtrl.hide();
  };

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
