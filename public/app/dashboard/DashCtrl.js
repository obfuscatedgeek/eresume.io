// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact:  http://extjs.eu/contact
 Date:     17/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */
(function() {

    var iam = 'DashCtrl'
        ,deps = ['$scope', 'EVENTS', '$state', '$ionicPopover', '$ionicPopup', 'UserSrvc']
        ,f = function($scope, EVENTS, $state, $ionicPopover, $ionicPopup, UserSrvc) {


            $scope.onMenuItemClick = function(menu) {

                var elmCurrentMenu = document.getElementById(menu.id)
                    ,elmMenuContainer = elmCurrentMenu.parentNode
                    ,elmLastActiveMenu = elmMenuContainer.querySelector('a.menuactive')
                ;

                // remove the menuactive class
                if(elmLastActiveMenu) {
                    $(elmLastActiveMenu).removeClass('menuactive');
                }
                $(elmCurrentMenu).addClass('menuactive');


                // emit event. listened by dashcontentctrl to open the side menu if its closed
                $scope.$broadcast(EVENTS.DASHMENUCLICKED, menu);
            };


            $scope.deleteProfile = function() {
                $scope.popover.hide();

                popDelete = $ionicPopup.alert({
                    title: 'Delete Profile'
                    ,template: 'Are you sure you want to permanently delete your profile?'
                    ,subTitle: 'this action cannot be undone'
                    ,scope: $scope
                    ,buttons: [
                        {
                            text: 'Cancel'
                            ,type: 'button-dark'
                        }
                        ,{
                            text: 'Delete Profile'
                            ,type: 'button-assertive'
                            ,onTap: function(e) {
                                //
                                //$rootScope.doLogout();
                                UserSrvc.deleteProfile()
                                    .then(function(res) {

                                        if(res.success) {
                                            $scope.doLogout();
                                        } else {
                                            console.log('error in deleting profile');
                                        }
                                    });
                            }
                        }
                    ]
                });
            };

            // shows the popover for user profile preference.
            $scope.showPopover = function($event) {
                if($scope.popover) {
                    $scope.popover.show($event);
                } else {
                    $ionicPopover.fromTemplateUrl('/app/dashboard/popover.html', {
                        scope: $scope
                    }).then(function(popover) {
                        $scope.popover = popover;
                        $scope.popover.show($event);
                    });
                }
            };
        };

    angular.module('cv').controller(iam, deps.concat(f));
})();