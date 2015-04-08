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

    var iam = 'SkillCtrl'
        ,deps = ['$scope', 'MainModel', 'EVENTS', 'CONFIG']
        ,f = function($scope, MainModel, EVENTS, CONFIG) {

            $scope.skills = MainModel.getPart('skills') || [];

            $scope.skill = {
                name: ''
                ,rating: 0
                ,_id: ''
            };


            $scope.editSkill = function(objSkill) {
                $scope.skill = JSON.parse(objSkill);
            };

            // save skill form.
            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.SKILL, $scope.skill);
            };

            // update the form
            $scope.$on(EVENTS.SKILLUPDATED, function(obj) {
                $scope.skills = MainModel.getPart('skills');

                $scope.skill = {
                    name: ''
                    ,rating: 0
                    ,_id: ''
                };


            });

            $scope.doDelete = function(objSkill) {
                $scope.$emit(EVENTS.FORMDELETED, CONFIG.SKILL, objSkill);
            };

        };


    angular.module('cv').controller(iam, deps.concat(f));
})();