// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact:  http://extjs.eu/contact
 Date:     16/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */
(function() {

    var iam = 'SessionSrvc'
        ,deps = ['ROLES']
        ,f = function(ROLES) {

            return {
                setSession: function(res) {
                    this.user = res.username;
//                    this.role = ROLES.editor;
                    this.role = 'asdfasdf';
                }

                ,getSession: function() {
                    return this;
                }

                ,destroySession: function() {
                    delete this.user;
                    delete this.role;
                }

                ,isAuthenticated: function() {
                    return !!window.sessionStorage.token;
                }
            };
        };

    angular.module('cv').factory(iam, deps.concat(f));
})();