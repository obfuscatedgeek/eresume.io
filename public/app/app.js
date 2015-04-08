// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact:  http://extjs.eu/contact
 Date:     11/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function () {
    'use strict';

    angular.module('cv', [
        'ionic'
        , 'ui.router'
        , 'satellizer'
        , 'ngResource'
        , 'ngProgress'
    ])
        .controller('MainCtrl', ['$scope', 'UserSrvc', 'toaster', '$state', 'EVENTS', 'CONFIG', function ($scope, UserSrvc, toaster, $state, EVENTS, CONFIG) {

            $scope.doLogout = function (message) {
                var res = UserSrvc.logout();

                if (res.success) {
                    toaster.pop('success', 'Logout successful', message || res.message);
                    $state.go('home');
                }
            };

            // common event listener to show toaster.
            $scope.$on(EVENTS.SHOWPOPUP, function (evt, msgType, toastType) {
                toaster.pop(toastType, CONFIG.MESSAGES[msgType].title, CONFIG.MESSAGES[msgType].message);
            });

        }])

        .config(['$httpProvider', '$authProvider', function ($httpProvider, $authProvider) {
            // push interceptor which will pass the window.sessionStorage.token once the user has logged in.
            $httpProvider.interceptors.push('httpInterceptor');

            $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = "*, https://www.linkedin.com";
            //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


            ///*
            $authProvider.linkedin({
                clientId: '',
                url: '/auth/linkedin',
                authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
                //redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
                //redirectUri: 'http://www.eresume.io/auth/accesstoken',
                redirectUri: 'http://localhost:3000/auth/accesstoken',
                requiredUrlParams: ['state'],
                scope: [],
                scopeDelimiter: ' ',
                state: 'STATE',
                type: '2.0',
                popupOptions: {width: 527, height: 582}
            });
//*/
        }])

        .run(['$rootScope', 'SessionSrvc', '$state', 'EVENTS', 'CONFIG', 'ngProgress', function ($rootScope, SessionSrvc, $state, EVENTS, CONFIG, ngProgress) {

            var alAreaStates =
                    ['dashboard.main.one.deep.flow.resume'
                        , 'dashboard.main.one.deep.flow.personal'
                        , 'dashboard.main.one.deep.flow.skill'
                        , 'dashboard.main.one.deep.flow.education'
                        , 'dashboard.main.one.deep.flow.work'
                        , 'dashboard.main.one.deep.flow.language'
                        , 'dashboard.main.one.deep.flow.project'
                    ]
                ;

            $rootScope.$on('$stateChangeStart', function (event, nextState, toParams) {




                if(alAreaStates.indexOf(nextState.name) === -1) {
                    ngProgress.color('#FFD34E');
                    ngProgress.height('3px');
                    ngProgress.start();
                }



                if (nextState.views) {
                    if (nextState.views.templateHolder) {
                        nextState.views.templateHolder.templateUrl = '/templates/professional.html';
                    }
                }

                if (nextState.name.match(/-tpl$/)) {

                    nextState.views.templateHolder.templateUrl = '/templates/' + toParams.name + '.html';

                }


                // check if the next state is home and if the user is logged in take him to his dashboard.
                if (nextState.name === 'home' && SessionSrvc.isAuthenticated()) {
                    event.preventDefault();
                    $state.go('dashboard.blank');
                    return;
                }

                // check if user is authenticated to access this state.
                if (nextState.data.isDmz) {


//                    authorisedRoles = nextState.data.authorizedRoles;


                    // check if user is logged in
                    if (!SessionSrvc.isAuthenticated()) {
                        event.preventDefault();
                        $state.go('home');
                        $rootScope.$broadcast(EVENTS.SHOWPOPUP, EVENTS.NOTAUTHENTICATED, CONFIG.ERROR);
                        return;
                    }


                    // check if user has the appropriate role access this part of application
//                    if(_.indexOf(authorisedRoles, SessionSrvc.getSession().role) === -1) {
//                        event.preventDefault();
//                        $state.go('home');
//                        $rootScope.$broadcast(EVENTS.SHOWPOPUP, EVENTS.NOTAUTHORISED, CONFIG.ERROR);
//                        return;
//                    }
                }
            });


            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

                console.log('###### state not found', unfoundState);
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
                ngProgress.complete();
            });


            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if(alAreaStates.indexOf(toState.name) === -1) {
                    ngProgress.complete();
                }

                if(toState.name === 'home') {
                    $('main-app-view').addClass('addOverflow');
                } else {
                    $('main-app-view').removeClass('addOverflow');
                }
            });


        }]);


    angular.element(document).ready(function () {
        angular.bootstrap(document, ['cv']);

    });

})();

