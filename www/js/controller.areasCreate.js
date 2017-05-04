angular.module('starter.controllers')

.controller(
    'AreasCreateCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope) {
        var areasCreate = this;

        //console.log('AreasCreate controller loading');

        areasCreate.payload = {};

        $scope.closeModal = function(){
            $scope.modal.hide();
            //console.log("Modal closed");
        };



        areasCreate.add = {
            submit: function() {
                //console.log('are your firing?')
                // //console.log('$rootScope.active.scope',$rootScope.active.scope._id)

                areasCreate.payload.job = $stateParams.jobId;
                areasCreate.payload.user = $rootScope.session._id;
                areasCreate.payload.scope = $stateParams.scopeId;


                //console.log('controller.areasCreate.add.submit.payload:', areasCreate.payload);
                API.add('areas', areasCreate.payload)
                .then(areasCreate.add.success,areasCreate.add.error);
                //console.log("job: ",areasCreate.payload.job );
                $scope.closeModal();

            },
            success: function(res) {
                //console.log('this area posted!', res.data)

                $rootScope.active.areas.push(res.data);
                areasCreate.payload = {};
            },
            error: API.debug.error

        };



        // Perform the login action when the user submits the login form

    }
]);
