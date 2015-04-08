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
 Contact: bawasa.ejaz@gmail.com
 Date:     22/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */
(function() {

    var iam = 'ResumeCtrl'
        ,deps = ['$scope', 'EVENTS', 'MainModel', 'CONFIG']
        ,f = function($scope, EVENTS, MainModel, CONFIG) {
            $scope.resume = MainModel.getPart('resume') || {title: '', headline: '', objective: ''};
            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.RESUME, $scope.resume);
            };


            $scope.$on(EVENTS.RESUMEUPDATED, function() {
                $scope.resume = MainModel.getPart('resume');
            });

        };

    angular.module('cv').controller(iam, deps.concat(f));
})();