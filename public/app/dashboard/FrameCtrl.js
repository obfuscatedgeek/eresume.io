// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     02/01/15


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