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

    var iam = 'PersonalCtrl'
        ,deps = ['$scope', 'EVENTS', 'MainModel', 'CONFIG']
        ,f = function($scope, EVENTS, MainModel, CONFIG) {


//            console.log('called everytime', MainModel.getPart('personal'));
            $scope.personal = MainModel.getPart('personal') || { firstName: '', lastName: '', email: '', website: '', address: '', dob: '', nationality: '', maritalStatus: ''};


//            console.log($scope.personal);

            // do some validation and emit event to do the actual save
            $scope.doSave = function() {
                $scope.$emit(EVENTS.FORMSAVED, CONFIG.PERSONAL, $scope.personal);
            };

            // update the model when save happens successfully.
            $scope.$on(EVENTS.PERSONALUPDATED, function(obj) {
                $scope.personal = MainModel.getPart('personal');
            });

        };


    angular.module('cv').controller(iam, deps.concat(f));
})();