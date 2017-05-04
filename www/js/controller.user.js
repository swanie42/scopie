angular.module('starter.controllers')

.controller(
    'UserCtrl',[
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
        var user = this;

        user.payload = {};
        user.init = function() {
            console.debug('controller.user.initiliazed');

            API.get('users', $rootScope.session._id )
                .then(user.get.success, user.get.error);
        };

        user.get = {
            success: function(res) {
                user.data = res.data;
                //console.log('USER GET user: ', user);
            },
            error: API.debug.failure
        };
        user.edit = {
            submit: function() {
                //console.log('user.edit.sumit is happening');
                API.edit('users',$rootScope.session._id)
                .then(user.edit.success,user.edit.error);
                //console.log('$rootScope.session._id: ', $rootScope.session._id)
            },
            success: function(res) {
                user.data = res.data;

                $ionicPopup.alert({
                    title: 'User Updated!',
                });
                //console.log('user UPDATED: ', res.data.image);

            },
            error: API.debug.error
        };
    }
]);
