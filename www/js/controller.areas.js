angular.module('starter.controllers')

.controller(
    'AreasCtrl', ['$rootScope', 'factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope) {
        var areas = this;

        areas.init = function() {
            areas.job = $stateParams.jobId;
            areas.scope = $stateParams.scopeId;
            //console.log('the areas.init is happening');
            var leToken = localStorage.getItem('token');
            //console.log('$rootScope.active.activities: ', $rootScope.active.activities);

            //console.log('leToken: ', leToken);
            API.list('areas', {
                job: areas.job
            }).then(areas.get.success, areas.get.error)
              .finally(areas.get.finally);
        };

        areas.get = {
            success: function(res) {
                $rootScope.active.areas = res.data;
                //console.log('$rootScope.active.areas: ', $rootScope.active.areas);
            },
            error: function(err) {
                console.error(err);
            },
            finally: function() {
                $rootScope.$broadcast('scroll.refreshComplete');
            }

        };



        areas.payload = {};

        $ionicModal.fromTemplateUrl('templates/create-area.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })
        .then(function(modal) {
            $scope.modal = modal;
        });


        $scope.openCreateNewArea = function() {
            $scope.modal.show();
            //console.log("This modal is opened");
        };


        areas.add = {
            submit: function() {
                areas.payload.job = $stateParams.jobId;
                //console.log('controller.areas.add.submit.payload:', areas.payload);

                API.add('areas', areas.payload)
                .then(areas.add.success, areas.add.error);
            },
            success: function(res) {
                $rootScope.active.areas.push(res.data);
                //console.log('this area posted!', res.data)

                areas.payload = {};
            },
            error: API.debug.error

        };

        areas.edit = {
            submit: function(area) {
                console.debug('controller.areas.edit.submit.area:', area);

                API.edit('areas', area._id, area)
                .then(areas.edit.success, areas.edit.error);
            },
            success: function() {
                Modal.notify({
                    text: 'Area updated successfully.',
                    status: 'alert-success'
                });
            },
            error: API.debug.error
        };

        areas.delete = {
            submit: function(area) {
                // console.debug('controllers.areas.delete:', area);
                if (confirm('Are you sure you want to delete this area?')) {
                    var index = $rootScope.active.areas.indexOf(area);
                    API.delete('areas', area._id).then(function() {
                        $rootScope.active.areas.splice(index, 1);
                        Modal.notify({
                            text: 'Area deleted successfully.',
                            status: 'alert-success'
                        });
                    }, areas.delete.error);
                }
            },
            error: API.debug.error
        };

        // Perform the login action when the user submits the login form

    }

]);
