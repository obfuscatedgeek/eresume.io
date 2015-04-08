// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     21/10/14


 */
(function () {

    var iam = 'BlankContentCtrl'
        , deps = ['$scope', 'alResumes', '$auth', '$ionicPopup', 'ModelSrvc', '$state', 'toaster', 'CONFIG', '$ionicModal', '$window', 'ngProgress', '$ionicLoading']
        , f = function ($scope, alResumes, $auth, $ionicPopup, ModelSrvc, $state, toaster, CONFIG, $ionicModal, $window, ngProgress, $ionicLoading) {
            $scope.resumes = alResumes;


            $scope.BASE_URL = CONFIG.BASE_URL;


            $scope.alTemplates = [
                {
                    name: 'Cyan'
                    ,imageUrl: CONFIG.BASEURL+'styles/images/cyan.png'
                    ,value: 'cyan'
                    ,imgSrc: ''
                    ,popularity: ''
                    ,downloads: ''
                    ,authorName: ''
                    ,authorUrl: ''
                }
                ,{
                    name: 'Magenta'
                    ,imageUrl: CONFIG.BASEURL+'styles/images/magenta.png'
                    ,value: 'magenta'
                    ,imgSrc: ''
                    ,popularity: ''
                    ,downloads: ''
                    ,authorName: ''
                    ,authorUrl: ''
                }
                ,{
                    name: 'Aqua'
                    ,imageUrl: CONFIG.BASEURL+'styles/images/aqua.png'
                    ,value: 'aqua'
                    ,imgSrc: ''
                    ,popularity: ''
                    ,downloads: ''
                    ,authorName: 'Ayoob Ullah'
                    ,authorUrl: 'https://www.behance.net/ubooya'
                }
                ,{
                    name: 'Sapphire'
                    ,imageUrl: CONFIG.BASEURL+'styles/images/sapphire.png'
                    ,value: 'sapphire'
                    ,imgSrc: ''
                    ,popularity: ''
                    ,downloads: ''
                    ,authorName: 'Tibor Brink'
                    ,authorUrl: 'https://www.behance.net/TiborBrink'
                }
                ,{
                    name: 'Golden'
                    ,imageUrl: CONFIG.BASEURL+'styles/images/golden.png'
                    ,value: 'golden'
                    ,imgSrc: ''
                    ,popularity: ''
                    ,downloads: ''
                    ,authorName: 'Al Rayhan'
                    ,authorUrl: 'https://www.behance.net/rtralrayhan'
                }
            ];


            // import from linkedin functionality
            $scope.authenticate = function (provider) {
                $ionicLoading.show({
                    template: 'Importing your profile from LinkedIn'
                });
                $auth.authenticate(provider)
                    .then(function(res) {
                        $window.location = CONFIG.BASEURL+'#/in/my/resume/at/myprofessionalprofessional?id='+res.data.model;
                        toaster.pop('success', 'Import successful', 'Your profile from LinkedIn has been successfully imported :-)');
                        $ionicLoading.hide();
                    }, function() {
                        $ionicLoading.hide();
                        toaster.pop('success', 'Import cancelled', 'You need to log in to your LinkedIn account inorder to import your profile.');
                    });
            };



            // delete functionality
            $scope.deleteResume = function(resumeId) {

                popDelete = $ionicPopup.alert({
                    title: 'Delete Resume'
                    ,template: 'Are you sure you want to permanently delete this resume ?'
                    //,subTitle: 'you cannot undo this action'
                    ,scope: $scope
                    ,buttons: [
                        {
                            text: 'Cancel'
                            ,type: 'button-dark'
                        }
                        ,{
                            text: 'Delete Resume'
                            ,type: 'button-assertive'
                            ,onTap: function(e) {

                                ModelSrvc.delete(resumeId)
                                    .then(function(response) {
                                        if(response.success) {
                                            $state.go($state.current, {}, {reload: true});
                                            toaster.pop('success', 'Resume deleted', response.message);
                                        } else {
                                            toaster.pop('error', 'Error deleting resume', response.message);
                                        }

                                    });
                            }
                        }
                    ]
                });
            };

            $scope.zoomIn = function(obj) {
                $scope.zoomInModal = $ionicModal.fromTemplate('<div class="modal" style="overflow-y: scroll"><header class="bar bar-header bar-positive"> <h1 class="title">'+obj.name+'</h1>' +
                '<div class="button button-clear" ng-click="zoomInModal.hide()">' +
                '<span class="icon ion-close"></span></div></header><content has-header="true" padding="true">' +
                '<p><img src="'+obj.imageUrl+'"/></p></content></div>', {
                    animation: 'slide-in-up'
                    ,scope: $scope
                });

                $scope.zoomInModal.show();
            };
        };
    angular.module('cv').controller(iam, deps.concat(f));
})();
