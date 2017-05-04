angular.module('starter.controllers')
    .factory('factory.utils', [
        '$rootScope',
        '$http',
        'Upload',
        function($rootScope, $http, Uploader) {
            var Utils = {}
            Utils.filters = {

                activities: {
                    scope: function(item) {
                        if (activities.entity.type !== 'scope') {
                            return item
                        } else if (!item.zone && !item.area) {
                            return item;
                        }
                    },
                    action: function(item) {
                        if (item.actions.indexOf(activities.payload.action) > -1) {
                            return item;
                        }
                    },
                    component: function(item) {
                        if (
                            item.actions.indexOf(activities.payload.action) > -1 &&
                            item.components.indexOf(activities.payload.component) > -1
                        ) {
                            return item;
                        }
                    },
                    material: function(item) {
                        if (
                            item.actions.indexOf(activities.payload.action) > -1 &&
                            item.components.indexOf(activities.payload.component) > -1 &&
                            item.materials.indexOf(activities.payload.material) > -1
                        ) {
                            return item;
                        }
                    }
                }
            };


            return Utils;
        }


    ]);
