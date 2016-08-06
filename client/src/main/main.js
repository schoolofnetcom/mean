(function() {
    angular
        .module('app')
        .controller('MainController', function(Tweets, $http) {
            var vm = this;

            vm.love = love;

            (function init() {
               $http({
                   method: 'GET',
                   url   : 'http://localhost:3002/tweet'
               })
               .then(function(result) {
                   if (!result.status) {
                        return;
                   }
                   var data = result.data['data'];

                   Tweets.set(data);

                   vm.tweets = Tweets.get();
               })
               .catch(function(err) {
                   console.log(err);
               });
            })();

            function love(tweet) {
                $http({
                    method: 'PUT',
                    url   : 'http://localhost:3002/tweet/' + tweet._id,
                    data  : tweet
                })
                    .then(function(result) {
                        if (!result.status) {
                            return;
                        }

                        var index = vm.tweets.indexOf(tweet);
                        var data  = result.data['data'];

                        if (index == -1) {
                            return;
                        }

                        vm.tweets[index] = data;

                        console.log(data, result.data, index);
                    })
                    .catch(function(err){
                       console.log(err);
                    });
            }
        });
})();