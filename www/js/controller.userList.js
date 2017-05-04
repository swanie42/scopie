angular.module('starter.controllers')

.controller(
    'UserListCtrl',[
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
        var users = this;

        users.payload = {};
        users.init = function() {
            console.debug('controller.users.initiliazed');

            API.list('users', { populate: 'group' })
                .then(users.list.success, users.list.error);
        };

        users.list = {
            success: function(res) {
                users.data = res.data;
                //console.log('USER LIST users.data: ', users.data);
            },
            error: API.debug.failure
        };
    }
]);
