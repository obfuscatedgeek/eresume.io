// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     15/10/14


 */
angular.module('cv')
    .factory('httpInterceptor', ['$rootScope', '$q', '$window', 'toaster', function ($rootScope, $q, $window, toaster) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                    //config.headers.Authorization = 'Bearer ' + 'AQTp04up6hMacB-y3nnHEbwCJSzViAN1yVIoTlgDYMYbCc8s9cllW6x8lKcfglVJ5boVblz2YvLKG9V91MHzGfgAaJvVz2Pe95PDGGxUGmszSBHToiU';
//                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }

                return response || $q.when(response);
            }
        };
    }]
);

