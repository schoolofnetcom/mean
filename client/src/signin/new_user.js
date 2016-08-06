(function() {
    angular
        .module('app')
        .controller('NewUserController', function($http, $uibModalInstance) {
            var vm = this;

            vm.create = create;
            vm.cancel = cancel;

            function create(form) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:3002/user',
                    data: form
                })
                .then(function(result) {
                    if (!result.status) {
                        return;
                    }
                    return $uibModalInstance.close(form);
                })
                .catch(function(err) {
                    console.log(err);
                });
            }

            function cancel() {
                $uibModalInstance.dismiss('cancel');
            }
        });
})();
