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

app.controller('newrequestCtrl', function($scope){

  $scope.requests = [];

  $scope.addRequest = function() {

  $scope.requests.push({
    title: $scope.title,
    address: $scope.address,
    description: $scope.description,
    dest_address: $scope.dest_address,
    delivered_before: $scope.delivered_before,
    valid_untill: $scope.valid_untill
  });
};

});


app.controller('myrequestsCtrl', function($scope, $ionicModal){

    $scope.expand = true;


    $scope.myexamples = [
      { title: 'My Sample 1 ', description: 'This is description 1', address: 'pöö', dest_address: 'pää', delivered_before: '20.5.1584', payment: '5€'},
      { title: 'My Sample 2', description: 'This is description 2'},
    ];

    $scope.save = function() {
      $scope.myexamples.push({
        title: $scope.title,
        address: $scope.address,
        description: $scope.description,
        dest_address: $scope.dest_address,
        delivered_before: $scope.delivered_before,
        payment: $scope.payment
      });
      $scope.modal.hide();
    }

    $scope.Modalopen = function(example){
      $scope.example = example;
      $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/myrequests-modal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.Modalclose = function(){
      $scope.moda.hide();
    }

  });
