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
 Date:     29/01/15

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function() {

    var iam = 'LabelCtrl'
        ,deps = ['$scope', 'EVENTS', 'MainModel', 'CONFIG']
        ,f = function($scope, EVENTS, MainModel, CONFIG) {

            $scope.label = MainModel.getPart('label') ||
            {
                glObjective: 'Objective'
                ,glExperience: 'Work Experience'
                ,glEducation: 'Qualification'
                ,glSkills: 'Skills'
                ,glLanguages: 'Languages'
                ,glProjects: 'Projects'
                ,glAboutMe: 'About Me'

                ,piName: 'Name'
                ,piDob: 'Date Of Birth'
                ,piAddress: 'Address'
                ,piWebsite: 'Website'
                ,piPhone: 'Phone'

                ,skTechnical: 'Technical Skills'
                ,skPersonal: 'Personal Skills'
            };

            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.LABEL, $scope.label);
            };

            $scope.$on(EVENTS.LABELUPDATED, function() {
                $scope.label = MainModel.getPart('label');
            });
        };

    angular.module('cv').controller(iam, deps.concat(f));
})();