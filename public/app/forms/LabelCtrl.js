// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     29/01/15


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