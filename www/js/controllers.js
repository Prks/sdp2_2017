var app = angular.module('starter.controllers', ['ionic']);

app.controller('accountCtrl', function($scope, $ionicModal,UserService,$state){

	$scope.user = UserService.getUser();
	
	  UserService.getProfile($scope.user.username).success(function(data) {
			  $scope.profile = data;
          }).error(function(data) {
             
          });  

    $scope.saveProfile = function(profile) {
		
		  UserService.saveProfile(profile).success(function(data) {
			  $state.reload();
          }).error(function(data) {
             
          });  
	  
	  
      $scope.Modalclose();
    }

    $scope.Modalopen = function(profile){
	  let cloned = Object.assign({}, profile);
      $scope.account = cloned;
      $scope.modal.show();
    };

    $ionicModal.fromTemplateUrl('templates/editprofile.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.Modalclose = function(){
      $scope.modal.hide();
	  $state.reload();
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
		$state.transitionTo("login", $state.current.params, {reload: true});
	}
	
	//Get all open request and show in homepage
	RequestService.getOpenRequest().success(function(data) {
		console.log(data);
		$scope.examples = data;
    }).error(function(data) {
              
    });
	
	
	// RequestService.getRequestsByUserName($scope.user.username).success(function(data) {
		// $scope.examples = data;
    // }).error(function(data) {
              
    // });
	
    $scope.Modalopen = function(example){
      $scope.example = example;
      $scope.modal.show();
    }
	
	// Function to apply request
	$scope.applyRequest = function(request)
	{
		//Get all open request and show in homepage
		RequestService.applyRequest(request.request_id).success(function(data) {			
			$scope.examples = data;
			$state.reload();	
			$scope.Modalclose();
		}).error(function(data) {
			$scope.Modalclose();			
		});
	}

    $ionicModal.fromTemplateUrl('templates/modal-template.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.Modalclose = function(){
      $scope.modal.hide();
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
			$state.transitionTo("myrequests", $state.current.params, {reload: true})
		}).error(function(data) {
			console.log(data);	  
		});
   };

});

app.controller('myincomingrequestsCtrl', function($scope, $ionicModal,$http, $state,RequestService,UserService){

    $scope.expand = true;
	
	$scope.user = UserService.getUser();
	
	RequestService.getIncomingRequestsByUserName($scope.user.username).success(function(data) {
		$scope.myexamples = data;
    }).error(function(data) {
              
    });
	
	// Reject request
    $scope.rejectRequest = function(request) {
		
		RequestService.rejectRequest(request.request_id).success(function(data) {
			$state.reload();
		}).error(function(data) {
				  
		});
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
      
	  RequestService.editRequest($scope.edit_request).success(function(data) {			
			$scope.edit_request = null;
			$scope.modal.hide();
			$state.reload();
		}).error(function(data) {
			console.log(data);	 
			$scope.modal.hide();
			$state.reload();			
		});
	  
      
    }

    $scope.Modalopen = function(example){
      $scope.edit_request = example;
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


app.controller('myrequestsCtrl', function($scope, $ionicModal,$http, $state,RequestService,UserService){

    $scope.expand = true;
	
	$scope.user = UserService.getUser();
	
	RequestService.getRequestsByUserName($scope.user.username).success(function(data) {
		$scope.myexamples = data;
    }).error(function(data) {
              
    });
	
	// Delete request
    $scope.delete = function(request) {
		
		RequestService.deleteRequest(request.request_id).success(function(data) {
			$state.reload();
		}).error(function(data) {
				  
		});
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
      
	  RequestService.editRequest($scope.edit_request).success(function(data) {			
			$scope.edit_request = null;
			$scope.modal.hide();
			$state.reload();
		}).error(function(data) {
			console.log(data);	 
			$scope.modal.hide();
			$state.reload();			
		});
	  
      
    }
	
	$scope.goToDeliverer = function(request){
		$state.go('deliverer',{request: request});
	}

    $scope.Modalopen = function(example){
      $scope.edit_request = example;
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
  
app.controller('delivererCtrl', function($scope,$stateParams,UserService){
    
	console.log($stateParams.request);
	
	UserService.getProfile($stateParams.request.courier_user).success(function(user) {             
			  $scope.courier = user;
    }).error(function(data) {
             
    });

    $scope.changeReview = function(value){
      $scope.delivererList[0].myRating = "'"+value+"'";
    }
  });
