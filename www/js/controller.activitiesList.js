angular.module('starter.controllers')

.controller(
    'ActivitiesListCtrl',[
        '$rootScope',
        'factory.api',
        '$stateParams',
        '$scope',
        '$ionicPopup',
    function(
        $rootScope,
        API,
        $stateParams,
        $scope,
        $ionicPopup
    ) {
        var activities = this;
        activities.init = function(e) {
            API.list('activities', {
                scope: $stateParams.scopeId,
                area: $stateParams.areaId || 'null'
            }).then(activities.populate, API.debug.error);

        };
        activities.message = function(){
            //console.log('SOMETHING!!!!');
        }
        activities.enums = {};
        activities.payload = {};

        activities.select = {
            reset: function() {
                activities.select.action = undefined;
                activities.select.component = undefined;
                activities.select.material = undefined;
                activities.select.method = undefined;

            }
        };
        activities.init = function(e) {
            API.list('activities', {
                scope: $stateParams.scopeId,
                area: 'null'
            }).then(activities.populate, API.debug.error);

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


        activities.populate = function(res) {
            $rootScope.active.activities = res.data;
            //console.log('$rootScope.active.activitfffies: ', $rootScope.active.activities);
        };


        activities.add = {
            submit: function(scope) {
                activities.payload.scope = scope._id;
                activities.payload.job   = $stateParams.jobId;
                activities.payload.user  = $rootScope.session._id;

                console.debug('[controller.activities.add.submit.payload]:', activities.payload);
                API.add('activities', activities.payload)
                    .then(activities.add.success, API.debug.error);

            },
            success: function(res){
                //console.log('SCOPE ADD ACTIVITIES SUCCESS RESPONSE: ', res);
                activities.payload = {};
                activities.select.reset();
                $rootScope.$broadcast("feed:new:item");
                $ionicPopup.alert({
                     title: 'Activity Added!',
                });
                activities.init();
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
        $scope.$on("new:scope", activities.init);
    }
]);
