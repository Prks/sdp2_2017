angular.module('starter.services', [])
.factory('UserService', function ($q,$http) {

    var user = null;

    return {
        login: function (username,password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/user/login';
			var data = {username:username,password:password};
			
			$http.post(url, data, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					var user = response.data.user;
					user.password = password;
					deferred.resolve(user);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        register: function (new_user) {
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/user/register';
			
			$http.post(url, new_user, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.status);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
		setUser:function(user){
			this.user = user;
		},
        getUser: function () {
            return this.user;
        },
		getProfile:function(username){
			var deferred = $q.defer();
            var promise = deferred.promise;
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/user/profile/'+username;
			
			$http.get(url, {}, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					var user = response.data.user;					
					deferred.resolve(user);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
		},
		saveProfile:function(profile){
			console.log(profile);
			var deferred = $q.defer();
            var promise = deferred.promise;
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/user/profile/';
			
			
			$http.post(url, profile, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					var user = response.data.user;					
					deferred.resolve(user);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
		}
    };
})
.factory('RequestService', function ($q,UserService,$http) {

    var deliveries = null;
	
	var url = 'https://sleepy-tor-72561.herokuapp.com';

    return {
        getRequestsByUserName:function(username){
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/create/'+user.username;
			
			$http.get(url, {username:username}, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.list);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
		getIncomingRequestsByUserName:function(username){
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/incoming/'+user.username;
			
			$http.get(url, {username:username}, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.list);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
		getOpenRequest:function(){
			var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/open/'+user.username;
			
			$http.get(url, {}, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.list);
				  }
				  else
				  {
					deferred.reject('Something went wrong');  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
		},
		deleteRequest:function(request_id){
			var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			
			var data = {
				request_id:request_id,
				creator_user:user.username
			};
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/delete';
			console.warn('Apply request');
			console.warn(data);
			$http.post(url, data, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.request);
				  }
				  else
				  {
					deferred.reject('Something went wrong');  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
		},
		rejectRequest:function(request_id){
			var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			
			var data = {
				request_id:request_id,
				courier_user:user.username
			};
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/reject';
			console.warn('Apply request');
			console.warn(data);
			$http.post(url, data, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.request);
				  }
				  else
				  {
					deferred.reject('Something went wrong');  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
		},
		applyRequest:function(request_id){
			var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			
			var data = {
				request_id:request_id,
				courier_user:user.username
			};
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/apply';
			console.warn('Apply request');
			console.warn(data);
			$http.post(url, data, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.request);
				  }
				  else
				  {
					deferred.reject('Something went wrong');  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
		},
        createRequest:function(new_request){
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			new_request.creator_user = user.username;
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/create';
			
			$http.post(url, new_request, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.status);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
		editRequest:function(edit_request){
			
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var user = UserService.getUser();
			edit_request.creator_user = user.username;
			
			var url = 'https://sleepy-tor-72561.herokuapp.com/api/rest/request/edit';
			
			$http.post(url, edit_request, {}).then(function successCallback(response) {
				  console.log(response);
				  if(response.data.result == true)
				  {
					deferred.resolve(response.data.status);
				  }
				  else
				  {
					deferred.reject(response.data.status);  
				  }
			}, function errorCallback(response) {
				deferred.reject('Something went wrong on server');
			});
			
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    };
});
