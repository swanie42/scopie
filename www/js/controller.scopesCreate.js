angular.module('starter.controllers')

.controller(
    'ScopesCreateCtrl',[ '$rootScope','factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope',
    function($rootScope, API, $stateParams, $ionicModal, $timeout, $scope) {
        var scopesCreate = this;
//console.log('ScopesCreate controller loading');

        scopesCreate.payload = {
            tasks: []
        };

        scopesCreate.tasks = [];

        $scope.closeModal = function(){
            $scope.modal.hide();
            //console.log("Modal closed");
        };
        scopesCreate.input = {name: ""};

           scopesCreate.enableSave = function(input) {
                return input.name.length > 1;
           };

        scopesCreate.add = {
            submit: function() {
                scopesCreate.payload.job = $stateParams.jobId;
                scopesCreate.payload.user = $rootScope.session._id;

                API.add('scopes', scopesCreate.payload)
                    .then(scopesCreate.add.success,scopesCreate.add.error);

                $scope.closeModal();
            },
            activity: function(taskId){
                //console.log('scopesCreate.add.activity: taskId: ', taskId);
                var selectedTask = $rootScope.enums.tasks.find(function(task){
                        return task._id === taskId;
                })
                scopesCreate.payload.tasks.push(taskId);
                scopesCreate.tasks.push(selectedTask);
                //console.log('scopesCreate.payload: ',scopesCreate.tasks)

            },
            removeActivity: function(taskId){
                //console.log('taskId:', taskId);
                var index = scopesCreate.payload.tasks.indexOf(taskId);
                //console.log('index:', index);

                scopesCreate.payload.tasks.splice(index, 1);
                scopesCreate.tasks.splice(index, 1);
            },
            success: function(res) {
                //console.log('scopesCreate:', res.data);
                $rootScope.active.scopes.push(res.data);
                $rootScope.$broadcast("new:scope", res.data);
                //console.log($rootScope);

                //console.log('$rootScope.active.scopes', $rootScope.active.scopes)
                scopesCreate.payload = {
                    tasks: []
                };
                scopesCreate.tasks = [];
            },
            error: API.debug.error
        };

    }
]);
