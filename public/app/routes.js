// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact:  http://extjs.eu/contact
 Date:     05/09/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function () {

    var dependencies = ['$stateProvider', '$urlRouterProvider', 'ROLES']
        , def = function ($stateProvider, $urlRouterProvider, ROLES) {

            $stateProvider
                .state('home', {
                    url: '/home'
                    , templateUrl: '/app/home/home.html'
                    , controller: 'HomeCtrl'
                    , data: {
                        isDmz: false
                    }
                })

                //.state('auth', {
                //    url: '/auth'
                //    , data: {
                //        isDmz: false
                //    }
                //    , abstract: true
                //})
                //
                //.state('auth.linkedin', {
                //    url: '/linkedin'
                //    , data: {
                //        isDmz: false
                //    }
                //    , resolve: {
                //        objAuth: function () {
                //        }
                //    }
                //})


                .state('dashboard', {
                    url: '/in'
                    , templateUrl: '/app/dashboard/dashboard.html'
                    , controller: 'DashCtrl'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , abstract: true

                })

                .state('dashboard.main', {
                    url: '/my'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'dashMenu': {
                            templateUrl: '/app/dashboard/menu.html'
                            , controller: 'DashMenuCtrl as dashMenuCtrl'
                        }
                        , 'dashContent': {
                            templateUrl: '/app/dashboard/content.html'
                            , controller: 'DashContentCtrl'
                            , resolve: {
                                mainModel: 'MainModel'
                                , getResume: function (mainModel) {
                                    return mainModel.getNewModel();
                                }
                            }

                        }
                    }
                    , abstract: true
                })


                .state('dashboard.blank', {
                    url: '/dashboard'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'dashMenu': {
                            templateUrl: '/app/dashboard/blankmenu.html'
                        }
                        , 'dashContent': {
                            templateUrl: '/app/dashboard/blankcontent.html'
                            , controller: 'BlankContentCtrl'
                            , resolve: {
                                UserSrvc: 'UserSrvc'
                                , alResumes: function (UserSrvc) {
                                    return UserSrvc.getResumes().then(function(al) {
                                        al.map(function(abisiimal) {
                                            //abisiimal.url = 'http://localhost:3000/templates/professional?modelId='+ abisiimal._id+'&isPreview=f';
                                            abisiimal.url = 'http://www.eresume.io/templates/professional?modelId='+ abisiimal._id+'&isPreview=f';
                                            return abisiimal;
                                        });
                                        return al;
                                    });

                                }
                            }
                        }
                    }
//                    ,abstract: true
                })

                .state('dashboard.main.one', {
                    url: '/resume'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , abstract: true
                    , views: {
                        'previewContainer': {
                            templateUrl: '/app/dashboard/preview.html'
                            , controller: 'PreviewCtrl'
                        }
                        , 'formContainer': {
                            templateUrl: '/app/dashboard/forms.html'
                        }
                    }
                })

                .state('dashboard.main.one.deep', {
                    url: '/at'
                    , data: {
                        isDmz: false
                        , authorizedRoles: [ROLES.editor]
                    }
                    , abstract: true
                    , views: {
                        'frameContainer': {
                            templateUrl: '/app/dashboard/frame.html'
                            ,controller: 'FrameCtrl as fc'

                        }
                        , 'templateContainer': {
                            templateUrl: '/app/dashboard/templates.html'
                            , controller: 'TemplatesCtrl'
                        }
                        , 'formHolder': {
                            templateUrl: '/app/dashboard/formContainer.html'
                        }
                    }

                })


                .state('dashboard.main.one.deep.flow', {
                    url: '/my'
                    , data: {
                        isDmz: false
                        , authorizedRoles: [ROLES.editor]
                    }
                    , abstract: true
                    , views: {
                        //'frameContainer': {
                        //  templateUrl: '/app/dashboard/frame.html'
                        //}
                        //'templateHolder': {
                        //  templateUrl: '/templates/elegant.html'
                        //}
                        'moreForm': {
                            templateUrl: '/app/dashboard/moreform.html'
                        }
                    }

                })


                .state('dashboard.main.one.deep.go-professional-tpl', {
                    url: '/myprofessional:name?id'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    //,abstract: true
                    , views: {
                        'templateHolder': {
                            //templateUrl: '/templates/123professional.html'
                            controller: 'TemplatesCtrl'
                        }
                    }
                    , resolve: {
                        MainModel: 'MainModel'
                        , ModelSrvc: 'ModelSrvc'
                        , objResume: function (MainModel, ModelSrvc, $stateParams) {


                            var id = null;

                            if (!$stateParams || !$stateParams.id) {
                                return MainModel;
                            }

                            id = $stateParams.id.length < 3 ? null : $stateParams.id;


                            if (id) {
                                return ModelSrvc.get($stateParams.id);
                            }

                            return MainModel;
                        }
                    }


                })


                .state('dashboard.main.one.deep.flow.personal', {
                    url: '/personal'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/personal.html'
                            , controller: 'PersonalCtrl'
                        }
                    }

                })


                .state('dashboard.main.one.deep.flow.resume', {
                    url: '/resume:id:template'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/resume.html'
                            , controller: 'ResumeCtrl'
                            , resolve: {
                                MainModel: 'MainModel'
                                , ModelSrvc: 'ModelSrvc'
                                , objResume: function (MainModel, ModelSrvc, $stateParams) {
                                    var id = null;

                                    if (!$stateParams || !$stateParams.id) {
                                        return MainModel;
                                    }

                                    id = $stateParams.id.length < 3 ? null : $stateParams.id;


                                    if (id) {
                                        return ModelSrvc.get($stateParams.id);
                                    }

                                    return MainModel;
                                }
                            }
                        }
                    }

                })

                .state('dashboard.main.one.deep.flow.skill', {
                    url: '/skill'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/skill.html'
                            , controller: 'SkillCtrl'
                            , resolve: {
                                mainModel: 'MainModel'
                                , alSkills: function (mainModel) {
                                    return mainModel.getPart('skills');
                                }
                            }
                        }
                    }
                })

                .state('dashboard.main.one.deep.flow.language', {
                    url: '/language'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/languages.html'
                            , controller: 'LanguagesCtrl'
                            , resolve: {
                                mainModel: 'MainModel'
                                ,alLanguages: function (mainModel) {
                                    return mainModel.getPart('languages');
                                }
                            }
                        }
                    }
                })


                .state('dashboard.main.one.deep.flow.work', {
                    url: '/work'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/work.html'
                            , controller: 'WorkCtrl'
                        }
                    }
                })

                .state('dashboard.main.one.deep.flow.project', {
                    url: '/project'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/project.html'
                            , controller: 'ProjectCtrl'
                        }
                    }
                })


                .state('dashboard.main.one.deep.flow.label', {
                    url: '/label'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/label.html'
                            , controller: 'LabelCtrl'
                        }
                    }
                })


                .state('dashboard.main.one.deep.flow.education', {
                    url: '/education'
                    , data: {
                        isDmz: true
                        , authorizedRoles: [ROLES.editor]
                    }
                    , views: {
                        'area': {
                            templateUrl: '/app/forms/education.html'
                            , controller: 'EducationCtrl'
                            , resolve: {
                                mainModel: 'MainModel'
                                , alEducation: function (mainModel) {
                                    return mainModel.getPart('education');
                                }
                            }
                        }
                    }
                });





            $urlRouterProvider
                .otherwise('/home');
        }


    angular.module('cv').config(dependencies.concat(def));
})();
