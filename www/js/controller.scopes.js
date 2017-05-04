angular.module('starter.controllers').controller('ScopesCtrl', ScopesCtrl);

ScopesCtrl.$inject = ['$rootScope', 'factory.api', '$stateParams', '$ionicModal', '$timeout', '$scope'];

function ScopesCtrl($rootScope, API, $stateParams, $ionicModal, $timeout, $scope) {
    var scopes = this;
    scopes.init = function() {
        // //console.log('$rootScope.enums: ', $rootScope.enums);
        scopes.job = $stateParams.jobId;
        scopes.activities = $rootScope.active.activities;
        // //console.log('the scopes.init is happening');

        // //console.log('$rootScope.active.activities:', $rootScope.active.activities);
        var leToken = localStorage.getItem('token');
        // //console.log('leToken: ',leToken);
        API.list('scopes', {
            job: $stateParams.jobId
        }).then(scopes.get.success, scopes.get.error)
          .finally(scopes.get.finally);
        scopes.jobId = $stateParams.jobId;
        $rootScope.active.areas = {};
    };

    scopes.get = {
        success: function(res) {
            $rootScope.active.scopes = res.data;
            // //console.log('scopes.data is; ',scopes.data);
        },
        error: function(err) {
            console.error(err);
        },
        finally: function() {
            $rootScope.$broadcast('scroll.refreshComplete');
        }
    };
    scopes.setActiveScope = function(scope) {
        $rootScope.active.scope = scope;
        // //console.log('$rootScope.active.scope',$rootScope.active.scope)
    };

    $ionicModal.fromTemplateUrl('templates/create-scope.html', {
        scope: $scope,
        animation: 'slide-in-up'
    })
    .then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openCreateNewScope = function() {
        $scope.modal.show();
        // //console.log("Scope modal is opened");
    };
    scopes.edit = {
            submit: function(scope) {
                // //console.log('submitting scope name edit', scope);
                API.edit('scopes', scope._id, scope)
                    .then(scopes.edit.success, API.debug.error);
            },
            success: function(res) {
                console.debug('[controller.scopes.edit.success]:', res.data);
            }
    };
};
