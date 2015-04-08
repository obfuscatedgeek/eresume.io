// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     24/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */
(function() {

    var iam = 'ModelSrvc'
        ,deps = ['$http', 'MainModel', 'CONFIG']
        ,f = function($http, MainModel, CONFIG) {

            return {
//                postResume: function() {
//
//                    return $http.post('/resume', {data: MainModel.getPart('resume'), id: MainModel.model.id})
//                        .then(function(res) {
//                            var obj = angular.toJson(res);
//
//                            MainModel.setResume(res.data);
//                            return {success: true, message: 'Resume updated'};
//                        });
//                }
//
//                ,postPersonal: function() {
//                    return $http.post('/personal', {data: MainModel.getPart('personal'), id: MainModel.model.id})
//                        .then(function(res) {
//                            var obj = angular.toJson(res);
//
//                            MainModel.setPart(CONFIG.PERSONAL.toLowerCase(), res.data);
//                            debugger;
//                            return {success: true, message: 'Resume updated'};
//                        });
//                }

                postPart: function(part, obj) {

                    var lc = part.toLowerCase();

                    return $http.post('/'+lc, {data: obj, modelId: MainModel.model.modelId || MainModel.model._id})
                        .then(function(res) {
                            var obj = angular.toJson(res);


                            switch(lc.toUpperCase()) {
                                case CONFIG.EXPERIENCE:
                                case CONFIG.SKILL:
                                case CONFIG.LANGUAGE:
                                case CONFIG.PROJECT:
                                    lc = lc+'s';
                                    break;
                            }

                            MainModel.setPart(lc, res.data.root);
                            MainModel.setPart('modelId', res.data.modelId);
                            MainModel.setPart('_id', res.data._id);

                            return {success: true, message: res.data.message || 'Resume updated', root: res.data.root, finalModel: MainModel.model};
                        });
                }

                ,doUpdate: function(part, obj) {
                    switch(part) {
                        case CONFIG.RESUME:
                        case CONFIG.PERSONAL:
                        case CONFIG.EDUCATION:
                        case CONFIG.EXPERIENCE:
                        case CONFIG.SKILL:
                        case CONFIG.LANGUAGE:
                        case CONFIG.PROJECT:
                        case CONFIG.LABEL:
                            return this.postPart(part, obj);
                    }
                }

                ,doAttributeUpdate: function(attrname, value) {

                    return $http.post('/attribute', {modelId: MainModel.model.modelId || MainModel.model._id, attribute: {name: attrname, value: value}})
                        .then(function(res) {
                            return res.data;
                        });
                }


                ,doDelete: function(part, obj) {

                    var url = part.toLowerCase();

                    //return $http.delete('/'+url, {data: obj, modelId: MainModel.model.modelId || MainModel.model._id})
                    return $http.delete('/'+url, {params: {data: obj._id, modelId: MainModel.model.modelId || MainModel.model._id}})
                        .then(function(res) {

                            switch(part.toUpperCase()) {
                                case CONFIG.EXPERIENCE:
                                case CONFIG.SKILL:
                                case CONFIG.LANGUAGE:
                                case CONFIG.PROJECT:
                                    part = part.toLowerCase()+'s';
                                    break;
                                case CONFIG.EDUCATION:
                                    part = part.toLowerCase();
                                    break;
                            }

                            MainModel.setPart(part, res.data.root[0][part]);
                            MainModel.setPart('modelId', res.data.root[0].modelId || res.data.root[0]._id);
                            MainModel.setPart('_id', res.data.root[0]._id);

                            return {success: true, message: res.data.message || 'Resume updated', root: res.data.root};
                        });
                }

                ,get: function(id) {
                    return $http.get('/resume', {params: {id: id}})
                        .then(function(res) {
                            if(res.data.success) {
                                MainModel.setModel(res.data.root[0]);
                                return {success: true};
                            }

                        });
                }

                ,delete: function(id) {

                    return $http.delete('/resume', {params: {modelId: id}})
                        .then(function(res) {
                            return res.data;
                            //if(res.data.success) {
                            //    return {success: true, message: 'Resume deleted successfully'};
                            //}
                            //return {success:false, message: res.data.message};
                        });
                }
            };

        };

    angular.module('cv').factory(iam, deps.concat(f));
})();