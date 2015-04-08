// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     18/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function() {

    var iam = 'DashContentCtrl'
        ,deps = ['$scope', 'EVENTS', '$ionicSideMenuDelegate', 'mainModel', 'ModelSrvc', 'CONFIG', '$state', 'ngProgress', 'toaster']
        ,f = function($scope, EVENTS, $ionicSideMenuDelegate, mainModel, ModelSrvc, CONFIG, $state, ngProgress, toaster) {



            $scope.closeMenu = function() {

                if($ionicSideMenuDelegate.isOpenLeft()) {
                    $ionicSideMenuDelegate.toggleLeft();
                }
            };

            $scope.$on(EVENTS.DASHMENUCLICKED, function() {

                if(!$ionicSideMenuDelegate.isOpenLeft()) {
                    $ionicSideMenuDelegate.toggleLeft();
                }

            });

            $scope.$on(EVENTS.FORMDELETED, function(event, formType, obj) {

                ngProgress.color('#FFD34E');
                ngProgress.height('10px');
                ngProgress.start();

                var part = formType.toLowerCase()
                    ,eventReturn
                ;



                switch (formType) {

                    case CONFIG.EXPERIENCE:
                        eventReturn = EVENTS.EXPERIENCEUPDATED;
                        break;
                    case CONFIG.EDUCATION:
                        eventReturn = EVENTS.EDUCATIONUPDATED;
                        break;
                    case CONFIG.SKILL:
                        eventReturn = EVENTS.SKILLUPDATED;
                        break;
                    case CONFIG.LANGUAGE:
                        eventReturn = EVENTS.LANGUAGEUPDATED;
                        break;
                    case CONFIG.PROJECT:
                        eventReturn = EVENTS.PROJECTUPDATED;
                        break;
                }

                ModelSrvc.doDelete(formType, obj)
                    .then(function(res) {

                        if(res.success) {
                            $scope.$broadcast(eventReturn);
                            $scope.$broadcast(EVENTS.FORMUPDATED, res.finalModel);

                            toaster.pop('success', 'Success', res.message);

                        } else {
                            toaster.pop('error', 'Failure', res.message);
                        }
                        ngProgress.complete();
                        //$scope.$broadcast(eventReturn);
                        //$scope.$broadcast(EVENTS.FORMUPDATED);
                    });

            });


            $scope.$on(EVENTS.FORMSAVED, function(event, formType, obj) {

                ngProgress.color('#FFD34E');
                ngProgress.height('10px');
                ngProgress.start();

                var part = formType.toLowerCase()
                    ,eventReturn;

                switch(formType) {

                    case CONFIG.PERSONAL:
//                        part = 'personal';
                        eventReturn = EVENTS.PERSONALUPDATED;
                        break;
                    case CONFIG.RESUME:
//                        part = 'resume';
                        eventReturn = EVENTS.RESUMEUPDATED;
                        break;
                    case CONFIG.EDUCATION:
//                        part = 'education';
                        eventReturn = EVENTS.EDUCATIONUPDATED;
                        break;
                    case CONFIG.EXPERIENCE:
//                        part = formType.toLowerCase();
                        eventReturn = EVENTS.EXPERIENCEUPDATED;
                        break;
                    case CONFIG.SKILL:
                        eventReturn = EVENTS.SKILLUPDATED;
                        break;
                    case CONFIG.LANGUAGE:
                        eventReturn = EVENTS.LANGUAGEUPDATED;
                        break;
                    case CONFIG.PROJECT:
                        eventReturn = EVENTS.PROJECTUPDATED;
                        break;
                    case CONFIG.LABEL:
                        eventReturn = EVENTS.LABELUPDATED;
                        break;
                }

                if(part) {
                    ModelSrvc.doUpdate(formType, obj)
                        .then(function(res) {

                            if(res.success) {
                                $scope.$broadcast(eventReturn, res.root);
                                $scope.$broadcast(EVENTS.FORMUPDATED, res.finalModel);

                                toaster.pop('success', 'Success', res.message);

                            } else {
                                toaster.pop('error', 'Failure', res.message);
                            }
                            ngProgress.complete();

                        });

                }
            });


            $scope.$on(EVENTS.TEMPLATEUPDATED, function(event, templateName) {

                var mdlId = mainModel.getModel()._id || mainModel.getModel().modelId;

                if(!mdlId || mdlId.trim().length === 0) {

                    if(mainModel.getModel()._id.trim().length === 0) {
                        $scope.$broadcast(EVENTS.TEMPLATESAVED, mainModel.getModel(), templateName);
                        return;
                    }
                }

                if(templateName) {
                    ModelSrvc.doAttributeUpdate('template', templateName)
                        .then(function(res) {
                            $scope.$broadcast(EVENTS.TEMPLATESAVED, res.finalModel);
                        });
                }
            });


        };


    angular.module('cv').controller(iam, deps.concat(f));
})();
