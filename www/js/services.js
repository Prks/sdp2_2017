angular.module('starter.services', [])
.factory('UserService', function ($q) {

    var user = null;

    return {
        login: function (username,password) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (username == 'user' && password == 'secret') {
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
        register: function (new_user) {
            console.log(new_user);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
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