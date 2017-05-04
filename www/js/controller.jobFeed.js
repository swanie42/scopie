angular.module('starter.controllers')
.controller('JobFeedCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'factory.api',
    function($scope, $rootScope, $stateParams, API) {
        // //console.log('AREA controller is running');
        var jobFeed = this;
        jobFeed.init = function() {
            //console.log('jobFeed.init happened! ');
            API.list('feeds', {job: $stateParams.jobId, populate:'user,job,area,scope' })
            .then(jobFeed.get.success, jobFeed.get.error);

        };
        var job = $stateParams.jobId;

        //console.log('job', job);

        jobFeed.get = {
            success: function(res, job) {

                //console.log("From JobFeed res.data[job]",res.data[job]);
                jobFeed.data = res.data;

            },
            error: API.debug.error
        };
        // $scope.$on("feed:new:image", jobFeed.init);
        // $scope.$on("feed:new:note", jobFeed.init);
        // $scope.$on("feed:new:activity", jobFeed.init);
        //event handler
        $scope.$on("SendDown", function (evt, data) {
            $scope.Message = "Inside jobFeedCtrl : " + data;
            jobFeed.init();
        });
    }
]);
