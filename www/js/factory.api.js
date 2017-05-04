var API_ENDPOINT = "//api.readyboard.co";

angular.module('starter.controllers')
    .factory('factory.api', [
        '$http',
        'Upload',
        function ($http, Uploader) {
            var API = {
                active: {},
                debug: {
                    args: function() {
                        console.debug(arguments);
                    },
                    success: function(res) {
                        console.debug(res.data);
                    },
                    failure: function(res) {
                        console.error(res.status, res.data);
                    }
                },
                list: function(entity, params) {
                    return $http({
                        method:'GET',
                        url: API_ENDPOINT + '/'+ entity,
                        params: params
                    });
                },
                get: function(entity, id, params) {
                    return $http({
                        method:'GET',
                        url: API_ENDPOINT + '/'+ entity +'/'+ id,
                        params: params
                    });
                },
                add: function(entity, payload) {
                    return $http({
                        method: 'POST',
                        url: API_ENDPOINT + '/'+ entity,
                        data: payload
                    });
                },
                edit: function(entity, id, payload) {
                    return $http({
                        method: 'PUT',
                        url: API_ENDPOINT + '/'+ entity +'/'+ id,
                        data: payload
                    });
                },
                delete: function(entity, id, params) {
                    return $http({
                        method:'DELETE',
                        url: API_ENDPOINT + '/'+ entity +'/'+ id,
                        params: params
                    });
                },
                session: function() {
                    return $http.get('/session');
                },
                upload: function(entity, payload) {
                    return Uploader.upload({
                        url: API_ENDPOINT + '/'+ entity,
                        method : 'POST',
                        data : payload
                    });
                },
                entity: function(key){
                    return API.entities[key];
                },
                entities: {
                    job:'jobs',
                    scope:'scopes',
                    zone:'zones',
                    area:'areas',
                    activity:'activities',
                    image:'images',
                    note:'notes',
                    feed:'feeds',
                    ionImage: 'ionImages',
                },

                enums: {
                    job: {
                        pcs: [
                            'Nick Kocorek',
                            'Mike Watson',
                            'Ben Highsmith',
                            'Brandon Rohner',
                            'Charlie Henry',
                            'Erik Olson',
                            'Justin Saball',
                            'Lacey Brady'
                        ],
                        pms: [
                            'Andres Hernandez',
                            'Dave Preston',
                            'Elijah Jaros',
                            'Howard Chinatti',
                            'Keith Coren',
                            'NA',
                            'Nick Kocorek',
                            'Tarraee Caldwell',
                            'Cory Hager'
                        ],
                        localServpros: '',
                        localServproInvolvs: [
                            'Local will provide Labor (GL, Supervisors, APM, PM, etc)',
                            'Local will provide Consumables',
                            'Local will provide Equipment',
                            'Local will be paying for Expenses - ex: Site services, subcontractors, any money spent',
                            'Local will be Project Coordinator',
                            'Local will NOT be providing any involvement'
                        ],
                        statuses: [
                            'Lost',
                            'Chase',
                            'Estimate',
                            'In-Progress',
                            'Billing',
                            'Collection',
                            'Collected'
                        ],
                        types: [
                            'Residential',
                            'Commercial'
                        ],

                        industries: [
                            'Education',
                            'Government',
                            'Hospitality',
                            'Multi-Family',
                            'Retail',
                            'Manufacturing',
                            'Healthcare/Assisted Living',
                            'Other'
                        ],
                        losses: {
                            types:[
                                'Water Loss',
                                'Fire Loss',
                                'Fire/Water Loss',
                                'Cleaning Nonrestoration',
                                'Equipment Rental',
                                'Other'
                            ],
                            causes: [
                                'Pipe Break / Sewer',
                                'Fire / Smoke Damage',
                                'Weather Event - Torrential rains, flooding, forest fires',
                                'Cleaning Nonrestoration'
                            ]
                        },
                        referrals: [
                            'Franchise Partner',
                            'Chase',
                            'Direct - Consultant',
                            'Direct - Adjuster',
                            'Direct - Broker',
                            'Direct - Commercial Client',
                            'Direct - SERVPRO Corporate Call'
                        ],
                        types: [
                            'Residential',
                            'Commercial'
                        ],
                        status: [
                            'Billing',
                            'Collected',
                            'Collection',
                            'Estimate',
                            'In-Progress',
                            'Lost'
                        ]
                    }
                }
            };

            if( window.debug ) {
                window.API = API;
            }

            return API;
        }
    ]);
