angular.module('starter.controllers')
.controller('AreaCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'factory.api',
    '$ionicModal',
    '$ionicScrollDelegate',
    '$timeout',
    function($scope, $rootScope, $stateParams, API, $ionicModal, $ionicScrollDelegate, $timeout) {
        // //console.log('AREA controller is running');
        var area = this;
        area.init = function() {
            //console.log('controller.area.initiliazing', $stateParams);
            //console.log('$stateParams.id: ',$stateParams.areaId);
            //console.log('$rootScope.active.activities ',$rootScope.active.activities);

            API.get('areas', $stateParams.areaId)
            .then(area.get.success, area.get.error);
        };


        area.get = {
            success: function(res) {
                $rootScope.active.area = res.data;
                    area.scrollBottom();
            },
            error: API.debug.error
        };
        area.scrollBottom = function() {
            $ionicScrollDelegate.scrollBottom();
        };
        // Modal Activities
        $ionicModal.fromTemplateUrl('templates/edit-activities.html', {
            id: '1', // We need to use and ID to identify the modal that is firing the event!
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });


        // Modal Dimensions
        $ionicModal.fromTemplateUrl('templates/edit-dimensions.html', {
            id: '2', // We need to use and ID to identify the modal that is firing the event!
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal2 = modal;
        });

        $scope.openModal = function(index) {
            if (index == 1) $scope.oModal1.show();
            else $scope.oModal2.show();
        };

        /* Listen for broadcasted messages */

        $scope.$on('modal.shown', function(event, modal) {
            //console.log('Modal ' + modal.id + ' is shown!');
        });
        $scope.$on("modal.hidden", area.init);

    }
]);
