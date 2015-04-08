// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true,angular:true */
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

(function() {

    var iam = 'HomeCtrl'
        ,dependencies = ['$scope', '$ionicPopup', 'UserSrvc', 'toaster', '$window', 'ROLES', 'EVENTS', '$state', '$ionicModal']
        ,f = function($scope, $ionicPopup, UserSrvc, toaster, $window, ROLES, EVENTS, $state, $ionicModal) {

            /**
             * @cfg login user details
             * @type {{username: string, password: string}}
             */
            $scope.user = {
                username: '', password: ''
            };


            /**
             * @cfg registration user details
             * @type {{username: string, password: string, confirmPassword: string}}
             */
            $scope.newUser = {
                username: ''
                ,password: ''
                ,confirmPassword: ''
            };

            /**
             * @cfg recover user details.
             * @type {{emailId: string}}
             */
            $scope.recover = {
                emailId: ''
            };


            /**
             * Creates the login modal if not available & show it so that user can login.
             * Shows the modal directly if created once
             */
            $scope.showLogin = function () {
                if($scope.modal) {
                    $scope.modal.show();
                    return;
                }

                $ionicModal.fromTemplateUrl('/app/home/login.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modal = modal;

                    $scope.modal.show();
                });
            }; // eo function showLogin


            /**
             * Closes the login modal. Called by login.html X button click
             * @param $event
             */
            $scope.closeLogin = function($event) {
                $scope.modal.hide();
            }; // eo function closeLogin

            // Login.html calls this when user clicks on activate account button
            $scope.doSendActivation = function() {
                UserSrvc.sendActivationLink($scope.recover.emailId)
                    .then(function(res) {
                        if (res.success) {
                            toaster.pop('success', 'Activation link mailed', res.message);
                        } else {
                            toaster.pop('success', 'Error', res.message);
                        }
                    });
            }; // eo function doSendActivation


            /**
             * Login.html calls this when user clicks recover password
             */
            $scope.doRecoverPassword = function() {
                UserSrvc.getRecoverPassword($scope.recover.emailId)
                    .then(function(res) {
                        if (res.success) {
                            toaster.pop('success', 'Password mailed', res.message);
                        } else {
                            toaster.pop('success', 'Error', res.message);
                        }
                    });
            }; // eo function doRecoverPassword

            /**
             * Login.html calls this when the user clicks on login
             */
            $scope.doLogin = function() {

                // this : a new scope is created here. i am still figuringout why
                // untill then we are going to validate the form based on the new scope
                // if form is valid copy the user object to original scope and move forward.
                if(!this.formLogin.$valid) {

                    this.formLogin.username.$pristine = false;
                    this.formLogin.password.$pristine = false;
                    return;
                }
                $scope.user = this.user;
                UserSrvc.get($scope.user)
                    .then(function(res) {
                        if(res.success) {

                            toaster.pop('success', 'Hello !!!', res.message);

                            // close the popup is its open
                            if($scope.modal) {
                                $scope.modal.hide();
                            }

                            // redirect to dashboard @todo
//                            $state.go('dashboard.main.one.resume');
                            $state.go('dashboard.blank');

                        } else {
                            toaster.pop('error', 'Login Failed', res.message);

                            $scope.$emit(EVENTS.loginFailed);
                            $scope.user.isLoggedIn = !!$window.sessionStorage.token;
                        }
                    });
            }; // eo function doLogin

            /**
             * Signup button handler
             * Does the actual registration of the user.
             * @param $event
             */
            $scope.doSignUp = function($event) {

                // check form validity and return
                if(!$scope.formRegister.$valid) {

                    $scope.formRegister.password.$pristine = false;
                    $scope.formRegister.email.$pristine = false;
                    $scope.formRegister.confirmPassword.$pristine = false;

                    return;
                }

                UserSrvc.post($scope.newUser)
                    .success(function(res) {
                        if(res && res.success) {
                            toaster.pop('success', 'Account created', res.message);
                        } else {
                            toaster.pop('error', 'Error', res.message);
                        }
                    })
                    .error(function(res) {
                        toaster.pop('error', 'Error', JSON.toString(res));
                    });
            }; // eo function doSignUp


            /**
             * following stuff are used to send a line
             * @type {{lineName: string, lineEmail: string, lineMessage: string}}
             */
            $scope.line = {
                lineName: ''
                ,lineEmail: ''
                ,lineMessage: ''
            };
            $scope.sendEmail = function() {

                if(!$scope.lineForm.$valid) {
                    toaster.pop('error', 'Invalid form', 'Please check you form inorder to message us.');
                    return;
                }

                toaster.pop('success', 'Thank you', 'Hey '+$scope.line.lineName+', thank you very much :-) ');
                UserSrvc.sendMessage($scope.line);


                $scope.line = {
                    lineName: ''
                    ,lineEmail: ''
                    ,lineMessage: ''
                };

                $scope.lineForm.$setPristine();

            }; // eo block sending a line.


            $scope.fillGuest = function() {
                $scope.user = {
                    username: 'bawasa.ejaz@gmail.com', password: 'password'
                };
            };


            $scope.technologies = [
                {
                    title: 'MongoDB'
                    ,url: 'http://www.mongodb.org/'
                }
                ,{
                    title: 'Express'
                    ,url: 'http://expressjs.com/'
                }
                ,{
                    title: 'AngularJS'
                    ,url: 'https://angularjs.org/'
                }
                ,{
                    title: 'Node.js'
                    ,url: 'http://nodejs.org/'
                }
                ,{
                    title: 'Ionic'
                    ,url: 'http://ionicframework.com/'
                }
                ,{
                    title: 'gulp.js'
                    ,url: 'http://gulpjs.com/'
                }
                ,{
                    title: 'Bower'
                    ,url: 'http://bower.io/'
                }
            ];


            $scope.zoomInHome = function(obj) {
                $scope.zoomInModal = $ionicModal.fromTemplate('<div class="modal" style="overflow-y: scroll"><header class="bar bar-header bar-positive"> <h1 class="title">'+obj.name+'</h1>' +
                '<div class="button button-clear" ng-click="zoomInModal.hide()">' +
                '<span class="icon ion-close"></span></div></header><content has-header="true" padding="true">' +
                '<p><img src="'+obj.imageUrl+'"/></p></content></div>', {
                    animation: 'slide-in-up'
                    ,scope: $scope
                });

                $scope.zoomInModal.show();
            };
        };
    angular.module('cv').controller(iam, dependencies.concat(f));
})();