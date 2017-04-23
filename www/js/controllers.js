var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope){

    $scope.sampleaccount = [
      { username: 'jtukkanen', password: '********', name: 'Jarvi Tukkanen', rating: '4.2', address: 'Oulunsalo 8', contact: '0445566778', email: 'etu.suku@nimi.com',}
    ]
    $scope.saveProfile = function() {
      $scope.sampleaccount.push({
        username: $scope.username,
        password: $scope.password,
        name: $scope.name,
        rating: $scope.rating,
        address: $scope.address,
        contact: $scope.contact,
        email: $scope.email
      });
    }
    $scope.editProfile = function(details) {
      $scope.details = details;
    }

  });

app.controller('loginCtrl', function(){

  });

app.controller('registerCtrl', function(){

  });

app.controller('homeCtrl', function($scope, $ionicModal, $http){

    $scope.expand = true;

$http.get('https://blooming-savannah-38179.herokuapp.com/api/post')
  .then(function (responce){
    $scope.examples = responce.data;
  });

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

app.controller('newrequestCtrl', function($scope, $http,$state){

  $scope.requests = [];

  $scope.addRequest = function() {

  $http({
    method: 'POST',
    url: 'https://blooming-savannah-38179.herokuapp.com/api/post',
    data: {
    title: $scope.title,
    address: $scope.address,
    description: $scope.description,
    destination_address: $scope.destination_address,
    valid_untill: $scope.valid_untill,
    payment: $scope.payment
    }
  }).then(function(){
    $state.transitionTo("home", $state.current.params, {reload: true});
  });
};

});


app.controller('myrequestsCtrl', function($scope, $ionicModal,$http, $state){

    $scope.expand = true;
    $http.get('https://blooming-savannah-38179.herokuapp.com/api/post')
      .then(function (responce){
        $scope.myexamples = responce.data;
      });

    $scope.myexamples = [
      { title: 'My Sample 1 ', description: 'This is description 1', address: 'pöö', dest_address: 'pää', delivered_before: '20.5.1584', payment: '5€'},
      { title: 'My Sample 2', description: 'This is description 2'},
      { title: 'Deliver my Sofa.', description: 'Anyone with a truck, please help!', address: 'Joulumerkkintie 2', dest_address: 'Pudasjarvi 6', deliverer: 'James Kith', status: 'On the way', deletePost: ''},
      { title: 'Bed delivery to Pudasjarvi', description: 'Bed delivery', address: 'Joulumerkkintie 2', dest_address: 'Kivikuja 4', deliverer:'', status: 'Requested', deletePost:''},
      { title: 'Bed delivery', description: 'Bed delivery', address: 'Joulumerkkintie 2', dest_address: 'Kivikuja 4', deliverer:'Mikko', status: 'Delivered', deletePost:'Yes'},
    ];

    $scope.delete = function(_id) {
     $http({
       method: 'DELETE',
       url: 'https://blooming-savannah-38179.herokuapp.com/api/post/' + _id,
     }).then(function(){
       $state.transitionTo("myrequests", $state.current.params, {reload: true})
     })
    }

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
      $scope.modal.hide();
    }

  });
app.controller('delivererCtrl', function($scope){
    $scope.delivererList = [
      { name: 'James Kith', averageRating: '3.6', availability: 'Yes', username: 'jkith', email: 'j.kith@kith.com', address: 'Uusikatu 24', owns: 'Truck', myRating: '3'},
    ];

    $scope.changeReview = function(value){
      $scope.delivererList[0].myRating = "'"+value+"'";
    }
  });
