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

    var iam = 'EducationCtrl'
        ,deps = ['$scope', 'CommonSrvc', '$ionicTabsDelegate', 'EVENTS', 'CONFIG', 'MainModel']
        ,f = function($scope, CommonSrvc, $ionicTabsDelegate, EVENTS, CONFIG, MainModel) {

            $scope.alEducation = MainModel.getPart('education') || [];

            $scope.education = {

                school: ''
                ,degree: ''
                ,address: ''
                ,startMonth: ''
                ,startYear: ''
                ,description: ''
                ,endMonth: ''
                ,endYear: ''
                ,_id: ''
                ,grade: ''
                ,gradeOnPaper: false
            };

            $scope.data = CommonSrvc.getMonthYear();


            // enable editing of this current education.
            $scope.doEdit = function(objEducation) {
                $scope.education = objEducation;
                $ionicTabsDelegate.select(1);
            };

            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.EDUCATION, $scope.education);
            };

            // update the model when save happens successfully.
            $scope.$on(EVENTS.EDUCATIONUPDATED, function(obj) {
                $scope.alEducation = MainModel.getPart('education');

                $scope.education = {
                    school: ''
                    ,degree: ''
                    ,address: ''
                    ,startMonth: ''
                    ,startYear: ''
                    ,description: ''
                    ,endMonth: ''
                    ,endYear: ''
                    ,_id: ''
                    ,grade: ''
                    ,gradeOnPaper: false
                };
            });


            $scope.doDelete = function(objEducation) {
                $scope.$emit(EVENTS.FORMDELETED, CONFIG.EDUCATION, objEducation);
            };

        };


    angular.module('cv').controller(iam, deps.concat(f));
})();