(function() {
    angular.module('starter.controllers')
.factory('factory.enums', ENUMS);

    function ENUMS() {
        return {
            tasks: {},
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
                ]
            }
        }
    }
})();
