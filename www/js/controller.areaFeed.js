angular.module('starter.controllers')
.controller('AreaFeedCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'factory.api',
    '$ionicScrollDelegate',
    function($scope, $rootScope, $stateParams, API, $ionicScrollDelegate) {
        // //console.log('AREA controller is running');
        var areaFeed = this;
        areaFeed.init = function(e) {
            //console.log('areaFeed.init happened!', e);
            API.list('feeds', {area: $stateParams.areaId, populate:'user,area' })
            .then(areaFeed.get.success, areaFeed.get.error);
        };

        areaFeed.get = {
            success: function(res) {
                areaFeed.data = res.data;
                //console.log("is anything here?",res);
                areaFeed.data.avatar = 'JK';
                areaFeed.scrollBottom();
            },
            error: API.debug.error
        };
        //event handler
        areaFeed.scrollBottom = function() {
            $ionicScrollDelegate.scrollBottom();
        };
        $scope.$on("feed:new:image", areaFeed.init);
        $scope.$on("feed:new:note", areaFeed.init);
        $scope.$on("feed:new:activity", areaFeed.init);
        $scope.$on("modal.hidden", areaFeed.init);

    }
]);
