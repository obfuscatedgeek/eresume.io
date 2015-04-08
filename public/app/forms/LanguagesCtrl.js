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

    var iam = 'LanguagesCtrl'
        ,deps = ['$scope', 'MainModel', 'EVENTS', 'CONFIG']
        ,f = function($scope, MainModel, EVENTS, CONFIG) {

            $scope.languages = MainModel.getPart('languages') || [];

            $scope.language = {
                name: ''
                ,rating: 0
                ,id: ''
            };

            $scope.alProficiency = [
                {value: '1', display: 'Elementary proficiency'}
                ,{value: '2', display: 'Limited working proficiency'}
                ,{value: '3', display: 'Professional working proficiency'}
                ,{value: '4', display: 'Full professional proficiency'}
                ,{value: '5', display: 'Native or bilingual proficiency'}
            ];




            $scope.editLanguage = function(objLang) {
                $scope.language = JSON.parse(objLang);
            };

            // save skill form.
            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.LANGUAGE, $scope.language);
            };

            // update the form
            $scope.$on(EVENTS.LANGUAGEUPDATED, function(obj) {
                $scope.languages = MainModel.getPart('languages');

                $scope.language = {
                    name: ''
                    ,rating: 0
                    ,id: ''
                };
            });

            $scope.doDelete = function(objLang) {
                $scope.$emit(EVENTS.FORMDELETED, CONFIG.LANGUAGE, objLang);
            };

        };


    angular.module('cv').controller(iam, deps.concat(f));
})();