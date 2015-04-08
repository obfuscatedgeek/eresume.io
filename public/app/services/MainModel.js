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

    var iam = 'MainModel'
        ,deps = ['CONFIG']
        ,f = function(CONFIG) {

            var Resume = function() {
                return {
                    modelId: ''
                    ,_id: ''
                    ,resume: {
                        title: '', headline: '', objective: ''
                    }
                    ,experiences: []
                    ,personal: {
                        firstName: ''
                        ,lastName: ''
                        ,phone: ''
                        ,email: ''
                        ,address: ''
                        ,website: ''
                        ,nationality: ''
                        ,maritalStatus: ''
                    }
                    ,education: []
                    ,work: []
                    ,skills: []
                    ,languages: []
                    ,template: ''
                    ,label: {
                        glObjective: 'Objective'
                        ,glExperience: 'Work Experience'
                        ,glEducation: 'Qualification'
                        ,glSkills: 'Skills'
                        ,glLanguages: 'Languages'
                        ,glProjects: 'Projects'
                        ,glAboutMe: 'About Me'

                        ,piName: 'Name'
                        ,piDob: 'Date Of Birth'
                        ,piAddress: 'Address'
                        ,piWebsite: 'Website'
                        ,piPhone: 'Phone'
                        ,piNationality: 'Nationality'
                        ,piMaritalStatus: 'Marital Status'

                        ,skTechnical: 'Technical Skills'
                        ,skPersonal: 'Personal Skills'
                    }
                };
            };

//            return {



                this.getNewModel = function() {
                    this.model = new Resume();
                };

                this.setModel = function(obj) {
                    this.model = obj;
                };

                this.getPart = function(part) {
                    return this.model[part];
                };

                this.setResume = function(objResume) {
                    this.model.resume = objResume;
                };

                this.setPart = function(part, obj) {

//                    if(!angular.isArray(this.model[part])) {
                        this.model[part] = obj;
//                    } else {
//                        this.model[part] = this.model[part].push(obj);
//                        this.model[part]= this.model[part].splice(obj.order, 0, obj);
//                    }
                };

                this.getModel = function() {
                  return this.model;
                };
//            };
        };


    angular.module('cv').service(iam, deps.concat(f));
})();
