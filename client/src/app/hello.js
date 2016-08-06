(function() {
    var component = {
        templateUrl : 'app/hello.html',
        controller  : 'HelloController',
        controllerAs: 'hello_vm'
    };

    angular
        .module('app')
        .component('app', component)
        .factory('Tweets', function() {
            var factory = {
                get: get,
                set: set,
                push: push
            };

            var data = [];

            function get() {
                return data;
            }

            function set(_data) {
                return data = _data;
            }

            function push(_data) {
                data.push(_data);
            }

            return factory;
        })
        .controller('HelloController', function($uibModal, Tweets, User) {
            var vm = this;

            vm.openModal = openModal;
            vm.userIsLogged = userIsLogged;

            function openModal() {
                var modal = $uibModal.open({
                    animation   : 'fadeIn',
                    templateUrl : 'app/create_tweet.html',
                    controller  : 'CreateTweetController',
                    controllerAs: 'create_tweet_vm'
                });

                modal.result
                    .then(function(result){
                        if (!result) {
                            return;
                        }

                        Tweets.push(result);

                        console.log(Tweets.get());
                    }, function(err) {
                        console.log(err);
                    })
            }

            function userIsLogged() {
                return Object.keys(User.get()).length > 0;
            }
        });
})();
