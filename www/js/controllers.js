var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope, $ionicModal){

    $scope.sampleaccount = [
      { username: 'jtukkanen', password: '********', name: 'Jarvi Tukkanen', rating: '4.2', address: 'Oulunsalo 8', contact: '0445566778', email: 'etu.suku@nimi.com'},
    ];
    $scope.saveProfile = function() {
      /* This only creates another object and there are two profiles shown. NEED TO FIX THIS WHEN IMPLEMENTING IN SERVER. WORKS OKAY NOW!
      $scope.sampleaccount.push({
        username: $scope.username,
        password: $scope.password,
        name: $scope.name,
        rating: $scope.rating,
        address: $scope.address,
        contact: $scope.contact,
        email: $scope.email
      });
      */
      $scope.modal.hide();
    }

    $scope.Modalopen = function(account){
      $scope.account = account;
      $scope.modal.show();
    }

    $ionicModal.fromTemplateUrl('templates/editprofile.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.Modalclose = function(){
      $scope.modal.hide();
    }
  });

app.controller('loginCtrl', function(){

  });

app.controller('registerCtrl', function(){

  });

app.controller('homeCtrl', function($scope, $ionicModal, requestService){

    $scope.expand = true;

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
      $scope.modal.hide();
    };
    $scope.examples = requestService.getRequest();
});

app.controller('mdlCtrl', function($scope){
  $scope.Modalhide = function(){
    $scope.mdlCtrl.hide();
  };

});

app.controller('newrequestCtrl', function($scope, requestService, $location){

 /* Not needed anymore I think

 $scope.addRequest = function() {
  $scope.examples.push({
    title: $scope.title,
    address: $scope.address,
    description: $scope.description,
    dest_address: $scope.dest_address,
    delivered_before: $scope.delivered_before,
    valid_untill: $scope.valid_untill
    });
  };
*/
    $scope.addNewRequest = function(currentObject){
      requestService.addRequest(currentObject);
    };
    $scope.goHome = function(view){
      $location.path(view);
    }
});


app.controller('myrequestsCtrl', function($scope, $ionicModal, requestService){

    $scope.expand = true;


/* These dummy data are transferred to the service now. 

  $scope.myexamples = [
      { title: 'My Sample 1 ', description: 'This is description 1', address: 'pöö', dest_address: 'pää', delivered_before: '20.5.1584', payment: '5€'},
      { title: 'My Sample 2', description: 'This is description 2'},
      
    ];
*/
    $scope.save = function(x) {
      /* Maybe needed for server interaction but not for local use. This was causing a new empty entry to be made whenever
         save was pressed

      $scope.myexamples.push({
        title: $scope.title,
        address: $scope.address,
        description: $scope.description,
        dest_address: $scope.dest_address,
        delivered_before: $scope.delivered_before,
        payment: $scope.payment
      });

      */
      $scope.examples = requestService.getRequest();
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

    $scope.remove = function(x){
      var index = $scope.myexamples.indexOf(x)
      $scope.myexamples.splice(index, 1);
    };
    $scope.myexamples = requestService.getMyRequest();

  });
app.controller('delivererCtrl', function($scope){
    $scope.delivererList = [
      { name: 'James Kith', averageRating: '3.6', availability: 'Yes', username: 'jkith', email: 'j.kith@kith.com', address: 'Uusikatu 24', owns: 'Truck', myRating: '3'},
    ];

    $scope.changeReview = function(value){
      $scope.delivererList[0].myRating = value;
    }
  });

// This service handles the data that is shared to both home view and my-request page
app.service('requestService', function(){
  var requestList = [
      { title: 'Request from Tanne ', description: 'Deliver table to my uncle', address: 'Kotkantie 1', dest_address: 'Isokatu 5', delivered_before: '14:00', payment: '10€'},
      { title: 'Title 2', description: 'This is description 2'},
      { title: 'Title 3', description: 'This is description 3'},
  ];

  var myRequestList = [
      { title: 'Deliver my Sofa.', description: 'Anyone with a truck, please help!', address: 'Joulumerkkintie 2', dest_address: 'Pudasjarvi 6', deliverer: 'James Kith', status: 'On the way', deletePost: ''},
      { title: 'Bed delivery to Pudasjarvi', description: 'Bed delivery', address: 'Joulumerkkintie 2', dest_address: 'Kivikuja 4', deliverer:'', status: 'Requested', deletePost:''},
      { title: 'Bed delivery', description: 'Bed delivery', address: 'Joulumerkkintie 2', dest_address: 'Kivikuja 4', deliverer:'Mikko', status: 'Delivered', deletePost:'Yes'},
  ];

  var addRequest = function(newObj){
    requestList.push(newObj);
    myRequestList.push(newObj);
  };
  var getRequest = function(){
    return requestList;
  };
  var getMyRequest = function(){
    return myRequestList;
  };
  return {
    addRequest: addRequest,
    getRequest: getRequest,
    getMyRequest: getMyRequest
  };
});
