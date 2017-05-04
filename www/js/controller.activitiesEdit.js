angular.module('starter.controllers')

.controller(
    'ActivitiesEditCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope', '$ionicPopup',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope, $ionicPopup) {
        var activities = this;
        //console.log('ActivitiesCreate controller loading', $stateParams.areaId);

            activities.enums = {};
            activities.payload = {};

            activities.select = {
                reset: function() {
                    //console.log('activities.select.reset HAPPENING: ');
                    activities.select.action = undefined;
                    activities.select.component = undefined;
                    activities.select.material = undefined;
                    activities.select.method = undefined;

                }
            };

        //console.log('$rootScope: ', $rootScope);
        $scope.closeModal = function(index) {
            if (index == 1) $scope.oModal1.hide();
            else $scope.oModal2.hide();
        };

        $scope.$on('modal.hidden', function(event, modal) {
            //console.log('Modal ' + modal.id + ' is hidden!');
        });
        activities.init = function(e) {
            API.list('activities', {
                scope: $stateParams.scopeId,
                area: $stateParams.areaId || 'null'
            }).then(activities.populate, API.debug.error);

        };
        activities.populate = function(res) {
            $rootScope.active.activities = res.data;
            //console.log('$rootScope.active.activitfffies: ', $rootScope.active.activities);
        };

        activities.add = {
            submit: function() {
                //console.log('Scopes activity add')
                activities.payload.scope = $stateParams.scopeId;
                activities.payload.job   = $stateParams.jobId;
                activities.payload.area  = $stateParams.areaId;
                activities.payload.user  = $rootScope.session._id;

                // console.debug('[controller.activities.add.submit.payload]:', activities.payload);
                API.add('activities', activities.payload)
                    .then(activities.add.success, API.debug.error);

            },
            success: function(res){
                activities.init();
                activities.payload = {};
                activities.select.reset();
                // $rootScope.$broadcast("modal.hidden");
            }
        };
        activities.delete = {
            submit: function(activity) {
                var index = $rootScope.active.activities.indexOf(activity);

                var confirmDelete = $ionicPopup.confirm({
                    title: 'Delete this Activity?'
                });

                confirmDelete.then(function (res) {
                    if (res) {
                        API.delete('activities', activity._id)
                            .then(activities.init, API.debug.error);
                    }
                })
            }
        };
        activities.filterOptions = {
            components: function() {
                activities.enums.components = $rootScope.enums.tasks.reduce(function(options, task){
                    if(task.action._id === activities.select.action) {
                        options[task.component._id] = task.component.label;
                    }
                    return options;
                }, {});

                activities.enums.materials = undefined;
                activities.enums.methods = undefined;

                activities.select.component = undefined;
                activities.select.material = undefined;
                activities.select.method = undefined;
            },
            materials: function() {
                activities.enums.materials = $rootScope.enums.tasks.reduce(function(options, task){
                    if(
                        task.action._id === activities.select.action &&
                        task.component._id === activities.select.component
                    ) {
                        options[task.material._id] = task.material.label;
                    }
                    return options;
                }, {});

                activities.enums.methods = undefined;

                activities.select.material = undefined;
                activities.select.method = undefined;
            },
            methods: function() {
                activities.enums.methods = $rootScope.enums.tasks.reduce(function(options, task){
                    if(
                        task.action._id === activities.select.action &&
                        task.component._id === activities.select.component &&
                        task.material._id === activities.select.material
                    ) {
                        options[task._id] = task.method.label;
                    }
                    return options;
                }, {});
                activities.select.method = undefined;
            }
        };
    }
]);
