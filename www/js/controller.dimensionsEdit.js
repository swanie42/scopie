angular.module('starter.controllers')

.controller(
    'DimensionsEditCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope) {
        var dimensionsEdit = this;
        //console.log('DimensionsCreate controller loading', $stateParams.areaId);

        dimensionsEdit.payload = {};
        $scope.closeModal = function(index) {
            if (index == 1) $scope.oModal1.hide();
            else $scope.oModal2.hide();
        };

        $scope.$on('modal.hidden', function(event, modal) {
            //console.log('Modal ' + modal.id + ' is hidden!');
        });


        dimensionsEdit.edit = {
            submit: function() {
                API.edit('areas', $stateParams.areaId, $rootScope.active.area)
                .then(dimensionsEdit.edit.success, dimensionsEdit.edit.error);
            },
            success: function(res) {

                //console.log('UPDATED AREA', res);
                dimensionsEdit.payload = {};
                $scope.closeModal();
            },
            error: function(err){
                //console.log("Error updating area : ", err);
            }
        };
    }
]);
