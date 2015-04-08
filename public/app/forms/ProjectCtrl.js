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
 Date:     22/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function() {

    var iam = 'ProjectCtrl'
        ,deps = ['$scope', 'CommonSrvc', 'MainModel', 'EVENTS', 'CONFIG', '$ionicTabsDelegate']
        ,f = function($scope, CommonSrvc, MainModel, EVENTS, CONFIG, $ionicTabsDelegate) {

            $scope.alProjects = MainModel.getPart('projects') || [];

            $scope.project = {
                name: ''
                ,url: ''
                ,keywords: ''
                ,startMonth: ''
                ,startYear: ''
                ,endMonth: ''
                ,endYear: ''
                ,_id: ''
                ,description: ''
                ,isPresent: false
            };


            $scope.data = CommonSrvc.getMonthYear();

            // enable editing of this current education.
            $scope.doEdit = function(objExperience) {
                $scope.project = objExperience;
                $ionicTabsDelegate.select(1);
            };

            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.PROJECT, $scope.project);
            };

            // update the model when save happens successfully.
            $scope.$on(EVENTS.PROJECTUPDATED, function(obj) {
                $scope.alProjects = MainModel.getPart('projects');

                $scope.project = {
                    name: ''
                    ,url: ''
                    ,keywords: ''
                    ,startMonth: ''
                    ,startYear: ''
                    ,endMonth: ''
                    ,endYear: ''
                    ,_id: ''
                    ,description: ''
                    ,isPresent: false
                };
            });


            $scope.doDelete = function(objExperience) {
                $scope.$emit(EVENTS.FORMDELETED, CONFIG.PROJECT, objExperience);
            };
        };

    angular.module('cv').controller(iam, deps.concat(f));
})();