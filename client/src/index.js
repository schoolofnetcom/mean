angular
    .module('app', [
        'ui.router',
        'ui.bootstrap'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('signin', {
                url         : '/signin',
                templateUrl : 'signin/signin.html',
                controller  : 'SigninController',
                controllerAs: 'signin_vm',
                access: {
                    requiredAuth: false
                }
            })
            .state('main', {
                url         : '/',
                templateUrl : 'main/main.html',
                controller  : 'MainController',
                controllerAs: 'main_vm',
                access: {
                    requiredAuth: true
                }
            });
    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    })
    .run(function($rootScope, $window, $state, AuthenticateService) {
       $rootScope.$on('$stateChangeStart', function(event, nextRoute, currentRoute) {
          if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuth && !AuthenticateService.isAuth && !$window.sessionStorage.token) {
              event.preventDefault();
              return $state.go('signin');
          }
           return;
       });
    });
