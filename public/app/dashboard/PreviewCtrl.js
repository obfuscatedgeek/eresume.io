// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     24/12/14


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