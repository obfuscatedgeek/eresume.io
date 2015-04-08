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