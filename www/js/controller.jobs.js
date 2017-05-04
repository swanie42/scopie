angular.module('starter.controllers')

.controller(
    'JobsCtrl',[ '$rootScope','factory.api', '$ionicModal', '$scope',
    function($rootScope, API, $ionicModal, $scope) {
        var jobs = this;

        jobs.init = function() {
            $rootScope.active={};
            //console.log('RootScope Session: ', $rootScope.session);

            API.list('jobs')
            .then(jobs.get.success, jobs.get.error)
            .finally(jobs.get.finally);
        };

        jobs.get = {
            success: function(res) {
                $rootScope.jobs = res.data;
                //console.log('jobs init res', res)
                //console.log('$rootScope; ', $rootScope)
            },
            error: function(err) {
                console.error(err.data);
            },
            finally: function(){
                $scope.$broadcast('scroll.refreshComplete');
            }
        };

        jobs.delete = {
            submit: function(job) {
                // console.debug('controllers.jobs.delete:', job);
                if (confirm('Are you sure you want to delete this job?')) {
                    var index = $rootScope.active.jobs.indexOf(job);
                    API.delete('jobs', job.jobId).then(function() {
                        $rootScope.active.jobs.splice(index, 1);
                        var deleteSuccess = $ionicPopup.alert({
                            title: 'Job Deleted!',
                        });
                    }, jobs.delete.error);
                }
            },
            error: API.debug.error
        };

        jobs.lit = 'aJobs';
        jobs.setLit = function(type) {
            jobs.lit = type;
        };
        jobs.isLit = function(type) {
            return type === jobs.lit;
        };

        $ionicModal.fromTemplateUrl('templates/create-job.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openCreateNewJob = function() {
            $scope.modal.show();
            //console.log("Job modal is opened");
        };

        jobs.init();

    }]);
