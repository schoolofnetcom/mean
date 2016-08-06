(function() {
    angular
        .module('app')
        .controller('CreateTweetController', function($uibModalInstance, $http) {
            var vm = this;

            vm.create = create;
            vm.cancel = cancel;

            function create(form) {
                $http({
                    method: 'POST',
                    url   : 'http://localhost:3002/tweet',
                    data  : form
                })
                .then(function(result) {
                    if (!result.status) {
                        return;
                    }

                    return $uibModalInstance.close(result.data);
                })
                .catch(function(err) {
                    console.log(err);
                });
            }

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }
        })
})();