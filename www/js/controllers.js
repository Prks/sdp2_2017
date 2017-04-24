var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope, $ionicModal){

    $scope.sampleaccount = [
      { username: 'jtukkanen', password: '********', name: 'Jarvi Tukkanen', rating: '4.2', address: 'Oulunsalo 8', contact: '0445566778', email: 'etu.suku@nimi.com',}
    ]
    $scope.saveProfile = function() {
      /* If uncommented, pushes a new account object. Need to fix binding here.
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
    };

    $ionicModal.fromTemplateUrl('templates/editprofile.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.Modalclose = function(){
      $scope.moda.hide();
    }


  });

app.controller('loginCtrl', function($scope, UserService, $ionicPopup, $state){
    $scope.data = {};

    $scope.login = function() {
          
          UserService.login($scope.data.username, $scope.data.password).success(function(user) {
              UserService.setUser(user);
			  $scope.data.username = null;
			  $scope.data.password = null;
              $state.go('home');
          }).error(function(data) {
              var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Please check your credentials!'
              });
          });
      }
  });

app.controller('registerCtrl', function($scope, UserService, $ionicPopup, $state){

    $scope.new_user = {};

    $scope.register = function() {
        UserService.register($scope.new_user).success(function(data) {
			  UserService.setUser($scope.new_user);
              $state.go('home');
          }).error(function(data) {
              $ionicPopup.alert({
                  title: 'Register failed!',
                  template: data
              });
          });        
    };
});

app.controller('homeCtrl', function($scope, $ionicModal, $http, UserService,$state, RequestService){

    $scope.expand = true;
	
	$scope.user = UserService.getUser();
	
	$scope.goToLogin = function() {
		UserService.setUser(null);
		$state.transitionTo("home", $state.current.params, {reload: true});
	}
	
	RequestService.getRequestsByUserName($scope.user.username).success(function(data) {
		$scope.examples = data;
    }).error(function(data) {
              
    });
	
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

app.controller('newrequestCtrl', function($scope,$http,$state,RequestService){

  $scope.requests = [];

  $scope.new_request = {};

  $scope.addRequest = function() {
		RequestService.createRequest($scope.new_request).success(function(data) {			
			$scope.new_request = null;
			console.log(data);
			$state.transitionTo("home", $state.current.params, {reload: true})
		}).error(function(data) {
			console.log(data);	  
		});
   };

});


app.controller('myrequestsCtrl', function($scope, $ionicModal,$http, $state,RequestService,UserService){

    $scope.expand = true;
	
	$scope.user = UserService.getUser();
	
	RequestService.getRequestsByUserName($scope.user.username).success(function(data) {
		$scope.myexamples = data;
    }).error(function(data) {
              
    });

    $scope.delete = function(_id) {
     $http({
       method: 'DELETE',
       url: 'https://blooming-savannah-38179.herokuapp.com/api/post/' + _id,
     }).then(function(){
       $state.transitionTo("myrequests", $state.current.params, {reload: true})
     })
    }
	
	$scope.getStatus = function(request)
	{
		return request.courier_user != null;
	}
	
	$scope.getCourier = function(request)
	{
		return request.courier_user == null ? 'Not avaiable' : request.courier_user;
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
