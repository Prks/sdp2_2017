var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope){

    $scope.sampleaccount = [
      { username: 'jtukkanen', password: '********', name: 'Jarvi Tukkanen', rating: '4.2', address: 'Oulunsalo 8', contact: '0445566778', email: 'etu.suku@nimi.com',}
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
      { title: 'Deliver my Sofa.', description: 'Anyone with a truck, please help!', address: 'Joulumerkkintie 2', dest_address: 'Pudasjarvi 6', deliverer: 'James Kith'},
      { title: 'Bed delivery to Pudasjarvi', description: 'Bed delivery', address: 'Joulumerkkintie 2', dest_address: 'Kivikuja 4'},
    ];
  });
app.controller('delivererCtrl', function($scope){
    $scope.delivererList = [
      { name: 'James Kith', averageRating: '3.6', availability: 'Yes', username: 'jkith', email: 'j.kith@kith.com', address: 'Uusikatu 24', owns: 'Truck', myRating: '3'},
    ];

    $scope.changeReview = function(value){
      $scope.delivererList[0].myRating = "'"+value+"'";
    }
  });