// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     22/10/14


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