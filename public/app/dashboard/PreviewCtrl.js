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
 Date:     24/12/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */


(function () {

    var iam = 'PreviewCtrl'
        , deps = ['$scope', 'MainModel', 'EVENTS', '$state', 'CONFIG']
        , f = function ($scope, MainModel, EVENTS, $state, CONFIG) {

            $scope.resumeId =  MainModel.getModel().modelId || MainModel.getModel()._id;
            $scope.resume = MainModel.getModel();


            $scope.BASE_URL = CONFIG.BASE_URL;


            $scope.$on(EVENTS.FORMUPDATED, function(event, mdl) {
                $scope.resumeId =  MainModel.getModel().modelId || MainModel.getModel()._id;
                $scope.resume = MainModel.getModel();
            });

            $scope.template = $state.params.name || 'professional';

            $scope.$on(EVENTS.TEMPLATEUPDATED, function(event, strTemplate) {
                console.log(strTemplate);
                $scope.template = strTemplate;
            });
        };


    angular.module('cv').controller(iam, deps.concat(f));



})();