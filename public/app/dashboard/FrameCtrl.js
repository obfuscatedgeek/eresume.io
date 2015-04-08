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
 Date:     02/01/15

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function () {
    var iam = 'FrameCtrl'
        , deps = ['$scope', 'EVENTS', 'MainModel', 'CONFIG', '$state']
        ,f = function($scope, EVENTS, MainModel, CONFIG, $state) {
            var modelId = MainModel.getModel()._id || MainModel.getModel().modelId || 0
                ,frameParams = [];

            frameParams.push('modelId='+modelId);
            frameParams.push('isPreview=t');
            frameParams.push('template='+$state.params.template);

            this.url = CONFIG.BASEURL+'templates/professional?'+frameParams.join('&');

            $scope.$on(EVENTS.TEMPLATESAVED, function(event, mdl, template) {


                modelId = MainModel.getModel()._id || MainModel.getModel().modelId || '0';
                strTemplate = template  || MainModel.getModel().template;



                frameParams = null;
                frameParams = [];

                frameParams.push('modelId='+modelId);
                frameParams.push('isPreview=t');
                frameParams.push('template='+template);

                this.url = CONFIG.BASEURL+'templates/professional?'+frameParams.join('&');

                document.getElementById('resume-frame').src = CONFIG.BASEURL+'templates/professional?'+frameParams.join('&');
            });

            $scope.$on(EVENTS.FORMUPDATED, function(evt, mdl) {


                modelId = MainModel.getModel()._id || MainModel.getModel().modelId || '';

                frameParams = null;
                frameParams = [];

                frameParams.push('modelId='+modelId);
                frameParams.push('isPreview=t');


                this.url = CONFIG.BASEURL+'templates/professional?'+frameParams.join('&');
                document.getElementById('resume-frame').src = CONFIG.BASEURL+'templates/professional?'+frameParams.join('&');
            });

        };

    angular.module('cv').controller(iam, deps.concat(f));
})();