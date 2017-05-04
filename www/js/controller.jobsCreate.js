angular.module('starter.controllers')

.controller(
    'JobsCreateCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope', '$ionicPopup',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope, $ionicPopup) {
    var jobsCreate = this;

    //console.log('JobsCreate controller loading');

    jobsCreate.payload = {};

    $scope.closeModal = function(){
        $scope.modal.hide();
        //console.log("Modal closed");
    };



    jobsCreate.add = {

                submit: function() {
                    API.add('jobs', jobsCreate.payload)
                        .then(jobsCreate.add.success, jobsCreate.add.error);
                        //console.log('the payload was added', jobsCreate.payload);
                        $scope.closeModal();
                },
                success: function(res) {
                    $rootScope.jobs.push(res.data);
                    var deleteSuccess = $ionicPopup.alert({
                        title: 'Job Created!',
                    });

                    //console.log('this job posted!', res.data)
                    jobsCreate.payload = {};
                },
                error: API.debug.error

            };



    // Perform the login action when the user submits the login form

}
]);
