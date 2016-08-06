(function() {
    angular
        .module('app')
        .factory('AuthenticateService', function() {
            var factory = {
               isAuth: false
            };

            return factory;
        })
        .factory('User', function() {
            var factory = {
                get: get,
                set: set
            };
            var data = {};

            function get() {
                return data;
            }

            function set(_data) {
                return data = _data;
            }

            return factory;
        })
        .factory('TokenInterceptor', function($q, $window, $location, User, AuthenticateService) {
            var factory = {
                request: request,
                response: response,
                requestError: requestError,
                responseError: responseError
            };

            function request(config) {
                config.headers = config.headers || {};

                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }

                return config;
            }

            function response(response) {
                if (response != null && response.status === 200 && $window.sessionStorage.token && !AuthenticateService.isAuth) {
                    AuthenticateService.isAuth = true;
                }

                return response || $q.when(response);
            }

            function requestError(rejection) {
                return $q.reject(rejection);
            }

            function responseError(rejection) {
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticateService.isA)) {
                    delete $window.sessionStorage.token;
                    AuthenticateService.isAuth = false;
                    User.set({});
                    $location.path('/signin');
                }

                return $q.reject(rejection);
            }

            return factory;
        })
        .controller('SigninController', function($http, $window, $state, $uibModal, User, AuthenticateService) {
            var vm = this;
            
            vm.openModal = openModal;
            vm.signin    = signin;
            
            function openModal() {
                var modal = $uibModal.open({
                    animation   : 'fadeIn',
                    templateUrl : 'signin/new_user.html',
                    controller  : 'NewUserController',
                    controllerAs: 'new_user_vm'
                });

                modal.result.then(function() {
                   console.log('dissmed');
                }, function() {
                   console.log('dissmed');
                });
            }

            function signin(form) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:3002/user/signin',
                    data: form
                })
                    .then(function(result) {
                        if (!result.status) {
                            return;
                        }

                        var data = result.data['data'];

                        AuthenticateService.isAuth = true;
                        $window.sessionStorage.token = data.token;
                        User.set(data.user);
                        $state.go('main');
                    })
                    .catch(function(err) {
                        console.log(err);
                    })
            }
        });
})();