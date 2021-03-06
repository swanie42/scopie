angular.module('starter.controllers')
.controller('ImagesCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'factory.api',
    '$cordovaCamera',
    '$ionicPopup',
    function($scope, $rootScope, $stateParams, API, $cordovaCamera, $ionicPopup) {
        // //console.log('AREA controller is running');
        var images = this;


        images.payload = {};
        images.openCamera = function () {
            // console.log('OPEN CAMERA');
            // var alertPopup1 = $ionicPopup.alert({
            //     title: 'Open Camera?',
            //     template: 'Is this working?'
            // });
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options)
                .then(function (imageData) {

                images.payload.images = [imageData];

                //console.log('GET PICTURE:');
                images.add.submit();

                //console.log('submit is happening!!!')

            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
        images.rapidCamera = function () {
            // console.log('OPEN CAMERA');
            // var alertPopup1 = $ionicPopup.alert({
            //     title: 'Open Camera?',
            //     template: 'Is this working?'
            // });
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
            };

            $cordovaCamera.getPicture(options)
                .then(function (imageData) {

                images.payload.images = [imageData];

                //console.log('GET PICTURE:');
                images.add.submit();
                images.rapidCamera();


                //console.log('submit is happening!!!')

            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
        images.add = {
            submit: function() {
                //console.log('images submit happening!');

                images.payload.area = $stateParams.areaId;
                images.payload.user = $rootScope.session._id;
                images.payload.job =  $stateParams.jobId;
                images.payload.single = true;


                //console.log('images.payload: ', images.payload.images);


                API.add('ionImages', images.payload)
                    .then(images.add.success, API.debug.error);

            },
            success: function(res) {
                //console.log('IMAGE res.data.url',res.data.url);
                // if(!res.data.area){
                //     $rootScope.active.job.img = res.data.url;
                // }

                //console.log('IMAGE BROADCAST');
                images.data = res.data.concat(images.data);
                //console.log('images.data[0]._id', images.data[0]._id);
                $rootScope.$broadcast('feed:new:image', res.data);
                images.payload = {};


                // var alertPopup1 = $ionicPopup.alert({
                //     title: 'Success',
                //     template: 'Image was uploaded'
                // });

            },
            error: API.debug.error

        };

        //raise event on $rootScope
           $scope.OnClick = function (evt) {
               $rootScope.$broadcast("SendDown", "some data");
           }

           //event handler
           $scope.$on("SendDown", function (evt, data) {
               $scope.Message = "Inside ImagesCtrl : " + data;
           });

    }
]);
