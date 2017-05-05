var API_ENDPOINT = "https://api.readyboard.co";
//'ngRoute', 'ngFileUpload', add these to the array below
angular.module('starter.controllers', ['ngRoute', 'ngFileUpload', 'ngCordova', 'ionic'])

.controller(
    'AppCtrl', ['$scope','$ionicModal', '$timeout', '$http', '$rootScope', '$cordovaCamera', '$ionicPopup', '$state', '$window', '$ionicHistory','factory.enums', 'factory.api',
    function($scope, $ionicModal, $timeout, $http, $rootScope, $cordovaCamera, $ionicPopup, $state, $window, $ionicHistory, ENUMS, API) {
    //console.log('app controller running');
    var Token = localStorage.getItem('readyboard.token'), User;

    try {
        User = JSON.parse(localStorage.getItem('readyboard.user'));
    } catch(err){
        console.error('could not parse user from localStorage');
    }


    if(User){
        $rootScope.session = User;
    }

    console.debug('[controller.$scope.init]', $rootScope);
    $rootScope.enums = ENUMS;



    $scope.enum = function(entity, category, params) {
        API.list(entity, params).then(function(res) {
            if (category) {
                $rootScope.enums[category][entity] = res.data;
            } else {
                $rootScope.enums[entity] = res.data;
            }
        }, API.debug.failure);
    };
    $scope.set = {
            active: function(entity, data) {
                $rootScope.active[entity] = data;
            }
        };
    $scope.populate = function(entity, id, key) {
        API.get(entity).then(function(res){
            app.set.active(key||entity, res.data);
        }, API.debug.error);
    };


    $rootScope.active = {};

    $scope.takePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }


    // Form data for the login modal
    $scope.loginData = {};
    $scope.listCanSwipe = true;
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    $scope.logout = function() {
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        $rootScope.session = {};
        $state.go('login');
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

        //console.log('Doing login', $scope.loginData);
        $http.post(API_ENDPOINT + '/token', {
            email: $scope.loginData.email,
            password: $scope.loginData.password
        }).then(function(res) {
            console.log("This is the http post login response", res);
            localStorage.setItem('readyboard.token', res.data.token);
            localStorage.setItem('readyboard.user', JSON.stringify(res.data.user));
            //console.log('res from controllers.js: ', res);
            getEnums();
            $state.go('app.jobs');
        }, function(err) {
            var alertPopup2 = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credential!'
            });
            //console.log('this is an error: ', err.data);
        });
    };
    if(!Token || !User){
        location.hash = "#/login";
    } else {
        getEnums();
    }
 function getEnums(){
        $scope.enum('actions');
        $scope.enum('components');
        $scope.enum('methods');
        $scope.enum('materials');
        $scope.enum('tasks', null, {
            populate: 'action,method,component,material'
        });
    }

}])
.controller('CameraCtrl', function($scope, $cordovaFile, $ionicLoading, $cordovaSocialSharing, $ionicHistory) {

    $scope.$on("$ionicView.enter", function(event) {
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
    });

    // LOAD IMAGE FROM THE CAMERA
    $scope.takePhoto = function(type) {

        var image = new Image();

        if ( type == "Camera" )
        type = navigator.camera.PictureSourceType.CAMERA ;
        else type = navigator.camera.PictureSourceType.PHOTOLIBRARY ;

        navigator.camera.getPicture(function(imageURI) {

            image.onload = function() {

                $scope.imageSRC = image ;

                var canvas =  document.getElementById('myCanvas');
                canvas.width = image.width;
                canvas.height = image.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0,0, image.width,image.height); // DRAW THE IMAGE ONTO CANVAS

                // READING METADATA FROM IMAGE
                EXIF.getData(image, function() {
                    //console.log("in exif " +  JSON.stringify(this));
                });

                $scope.cleanUp(); // CLEAN UP IMAGES TAKEN
            };

            image.src = imageURI ; // LOAD THE IMAGE OBJECT

        }, function(message) { //ERROR HANDLER
            //console.log("error " + message);

        }, { // CAMERA OPTIONS
            quality:50,
            sourceType: type,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true,
            destinationType: Camera.DestinationType.FILE_URI
        });
    }

    $scope.cleanUp = function(){ // CLEAN UP PHOTOS TAKEN

        navigator.camera.cleanup(onSuccess, onFail);

        function onSuccess() {
            //console.log("Camera cleanup success.")
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }


    // ROTATE IMAGE FUNCTION
    $scope.rotateImage = function(degree){

        $ionicLoading.show({
            template: 'Working...'
        });

        // DEPENDING ON THE SIZE OF THE IMAGE, THE ROTATION CAN ALSO BE CPU HEAVY
        // BECAUSE IT NEEDS TO REDRAW THE IMAGE

        setTimeout( function() { // SET A TIMEOUT SO THAT THE LOADING POPUP CAN BE SHOWN

            var image = $scope.imageSRC ;

            image.onload = null ; // remove the onload handler

            var canvas =  document.getElementById('myCanvas');

            // swap the width and height for 90 degree rotation
            canvas.width = image.height;
            canvas.height = image.width;

            var ctx = canvas.getContext("2d");

            // translate context to center of canvas
            ctx.translate(image.height / 2, image.width / 2);
            ctx.rotate((Math.PI/180) * degree); // rotate image

            // draw the new rotated image
            ctx.drawImage(image, - image.width / 2, - image.height / 2, image.width, image.height);

            $scope.imageSRC.src = canvas.toDataURL(); // save the new original image

        }, 100);

        setTimeout( function() {$ionicLoading.hide();},100); // HIDE THE POPUP AFTER IT'S DONE
    }

    // SHARE OR SAVE PHOTO FUNCTION
    $scope.sharePhoto = function(){

        if ( ionic.Platform.isAndroid() ) { // SAVE FOR ANDROID
            window.canvas2ImagePlugin.saveImageDataToLibrary(
                function(msg){
                    alert("Photo Saved!");
                },
                function(err){
                    alert(err);
                },
                'myCanvas'
            );
        }
        else{ // SHARE SHEET WORKS FOR IOS ONLY

            var canvas =  document.getElementById('myCanvas');
            var dataURL = canvas.toDataURL();

            $cordovaSocialSharing
            .share("title", "message", dataURL, "link") // Share via native share sheet
            .then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }
    }
});
