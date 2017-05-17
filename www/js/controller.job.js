
angular.module('starter.controllers')
.controller('JobCtrl', [
    '$rootScope',
    '$stateParams',
    'factory.api',
    '$ionicPopup',
    '$cordovaGeolocation',
    '$scope',

    function($rootScope, $stateParams, API, $ionicPopup, $cordovaGeolocation, $scope) {
        //console.log('this: ', this);
        var job = this;
        // job.active = {};



        job.init = function() {
            //console.log('controller.job.initiliazing', $stateParams);
            //console.log('$stateParams.jobId: ',$stateParams.jobId);
            //console.log("$rootScope.active.job; ", $rootScope.active.job);
            API.get('jobs', $stateParams.jobId)
            .then(job.get.success, job.get.error);
            $rootScope.active.scopes = {};
        };

        job.get = {
            success: function(res) {
                //console.log('res.data', res.data);
                $rootScope.active.job = res.data;
                //console.log('$rootScope.active.job', $rootScope.active.job);

                // API.list('scopes', { job: $stateParams.jobId })
                //     .then(job.scope.get.success, job.scope.get.error);
            },
            error: API.debug.error
        };
        job.lit = 'fnol';
        job.setLit = function(type) {
            job.lit = type;
        };
        job.isLit = function(type) {
            return type === job.lit;
        };

        job.edit = {
            submit: function() {
                //console.log('job.edit.sumit is happening');
                API.edit('jobs',$stateParams.jobId)
                .then(job.edit.success,job.edit.error);
                //console.log('$stateParams.jobId & $rootScope.active.job: ', $stateParams.jobId, $rootScope.active.job)
            },
            success: function(res) {
                job.data = res.data;
                $ionicPopup.alert({
                    title: 'Job Updated!',
                });
                job.init();

                $rootScope.$broadcast('feed:new:image', res.data);
                $rootScope.$broadcast('jobs:new:image', res.data);

            },
            error: API.debug.error
        };
        //MAP GEOLOCATION
        // job.options = {timeout: 10000, enableHighAccuracy: true};
        //
        // $cordovaGeolocation.getCurrentPosition(job.options)
        //
        // .then(function(position){
        //     //console.log('get current position')
        //
        //     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //
        //     var mapOptions = {
        //         center: latLng,
        //         zoom: 15,
        //         mapTypeId: google.maps.MapTypeId.SATELLITE
        //     };
        //
        //     job.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        // }, function(error){
        //     //console.log("Could not get location");
        // });
    }
]);

    // job.clicked = function(num) {
    //     //console.log('Clicked is clicked')
    //     job.var = num;
    // }
