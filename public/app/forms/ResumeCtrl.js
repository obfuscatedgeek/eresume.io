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