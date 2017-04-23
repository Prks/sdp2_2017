angular.module('starter.services', [])
.factory('UserService', function ($q,$http) {

    var user = null;

    return {
        login: function (username,password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
			
			var url = 'http://localhost:3000/api/rest/login';
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
			
			var url = 'http://localhost:3000/api/rest/register';
			
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
        }
    };
})
.factory('RequestService', function ($q) {

    var deliveries = null;

    return {
        getRequestsByUserId:function($user_id){
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name == 'user1' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
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
            console.log(new_request);
        }
    };
});
