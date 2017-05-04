angular.module('starter.controllers')
.controller('AreaNotesCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'factory.api',
    function($scope, $rootScope, $stateParams, API) {
        // //console.log('AREA controller is running');
        var areaNotes = this;

        areaNotes.payload = {};

        areaNotes.add = {
            submit: function() {
                //console.log('areaNotes submit happened!');

                areaNotes.payload.area = $stateParams.areaId;
                areaNotes.payload.user = $rootScope.session._id;
                areaNotes.payload.job = $stateParams.jobId;

                API.add('notes', areaNotes.payload)
                .then(areaNotes.add.success, areaNotes.add.error);
                //console.log('areaNotes.payload: ', areaNotes.payload);


            },
            success: function(res) {
                $rootScope.$broadcast("feed:new:note", res.data);
                areaNotes.payload = {};
            },
            error: API.debug.error

        };
        //raise event on $rootScope


           //event handler
           $scope.$on("SendDown", function (evt, data) {
               $scope.Message = "Inside areaNotesCtrl : " + data;

           });

    }
]);
