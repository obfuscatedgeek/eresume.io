// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     17/10/14


 */
(function() {

    var iam = 'DashMenuCtrl'
        ,deps = ['$scope', 'EVENTS']
        ,f = function($scope, EVENTS) {

            var me = this
                ,prefixSref = 'dashboard.main.one.deep.flow.';

            me.menuItems = [
                {
                    href: prefixSref+'resume'
                    ,icon: 'ion-clipboard'
                    ,title: 'Resume'
                    ,id: 'resume'
                }
                ,{
                    href: prefixSref+'personal'
                    ,icon: 'ion-email'
                    ,title: 'Contact'
                    ,id: 'personal'
                }
                ,{
                    href: prefixSref+'education'
                    ,icon: 'fa fa-graduation-cap'
                    ,title: 'Qualification'
                    ,id: 'education'
                }
                ,{
                    href: prefixSref+'work'
                    ,icon: 'ion-briefcase'
                    ,title: 'Experience'
                    ,id: 'work'
                }
                ,{
                    href: prefixSref+'project'
                    ,icon: 'fa fa-rocket'
                    ,title: 'Projects'
                    ,id: 'project'
                }
                ,{
                    href: prefixSref+'skill'
                    ,icon: 'ion-settings'
                    ,title: 'Skills'
                    ,id: 'skills'
                }
                ,{
                    href: prefixSref+'language'
                    ,icon: 'fa fa-language'
                    ,title: 'Languages'
                    ,id: 'languages'
                }
                ,{
                    href: prefixSref+'label'
                    ,icon: 'fa fa-font'
                    ,title: 'Labels'
                    ,id: 'labels'
                }
            ];


//            me.onItemClick = function(menuItem) {
//                $scope.$emit(EVENTS.DASHMENUCLICKED, menuItem);
//                console.log('dashmenu event emitted');
//            }

        };



    angular.module('cv').controller(iam, deps.concat(f));
})();
