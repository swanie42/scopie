angular.module('starter.controllers')
.service('API_Interceptor', function(){
    var service = this;
    service.request = function(config){
    // //console.log('service.req is running: ')
    var token = localStorage.getItem('readyboard.token');
        if(token){
        config.headers['x-access-token'] =  token;
        };
        return config;
    }
});
