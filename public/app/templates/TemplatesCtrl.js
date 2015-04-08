// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     01/11/14


 */
(function() {

    var iam = 'TemplatesCtrl'
        ,deps = ['$scope', 'MainModel', 'EVENTS']
        ,f = function($scope, MainModel, EVENTS) {

            //$scope.resume = MainModel.model;

            // updates the model to reflect the current model
            //$scope.$on(EVENTS.FORMUPDATED, function(evt, mdl) {
            //  $scope.resume = mdl;
            //});







            $scope.alTemplates = [
                //{
                //    title: 'Elegant'
                //    ,description: 'graceful and stylish template'
                //    ,value: 'elegant'
                //}
                //,{
                //    title: 'Professional'
                //    ,description: 'egnaging designs and corporate looking'
                //    ,value: 'professional'
                //}
                {
                    title: 'Cyan'
                    ,description: 'crowded'
                    ,value: 'cyan'
                }
                ,{
                    title: 'Magenta'
                    ,description: 'lowercase'
                    ,value: 'magenta'
                }
                ,{
                    title: 'Aqua'
                    ,description: 'Ayoob Ullah'
                    ,url: 'https://www.behance.net/ubooya'
                    ,value: 'aqua'
                }
                ,{
                    title: 'Sapphire'
                    ,description: 'Tibor Brink'
                    ,url: 'https://www.behance.net/TiborBrink'
                    ,value: 'sapphire'
                }
                ,{
                    title: 'Golden'
                    ,description: 'Al Rayhan'
                    ,url: 'https://www.behance.net/rtralrayhan'
                    ,value: 'golden'
                }
            ];


            $scope.updateTemplate = function(objTemplate) {
                $scope.$emit(EVENTS.TEMPLATEUPDATED, objTemplate.value);
            };

        };

    angular.module('cv').controller(iam, deps.concat(f));


})();
