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
 Contact:  http://extjs.eu/contact
 Date:     22/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

(function() {
    var iam = 'CommonSrvc'
        ,deps = ['CONFIG']
        ,f = function(CONFIG) {
            return {


                getMonthYear: function() {
                    var initYear = 1974
                        ,endYear = 2020
                        ,alYear = [];

                    while(initYear < endYear) {
                        alYear.push(""+initYear++);
                    }

                    return {
                        months : CONFIG.MONTHS
                        ,year: alYear
                    };
                }

            };
        };


    angular.module('cv').service(iam, deps.concat(f));
})();