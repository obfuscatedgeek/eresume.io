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
 Date:     26/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

var mongoose = require('mongoose');

var educationSchema = new mongoose.Schema({
    school: String
    ,degree: String
    ,address: String
    ,startMonth: {
        type: String
        ,default: ''
    }
    ,startYear: {
        type: String
        ,default: ''
    }
    ,description: String
    ,endMonth: {
        type: String
        ,default: ''
    }
    ,endYear: {
        type: String
        ,default: ''
    }
    ,grade: String
    ,gradeOnPaper: Boolean
});

var experienceSchema = new mongoose.Schema({
    company: {
        type: String
        ,trim: true
    }
    ,designation: {
        type: String
        ,trim: true
    }
    ,startMonth: {
        type: String
        ,default: ''
    }
    ,startYear: {
        type: String
        ,default: ''
    }
    ,endMonth: {
        type: String
        ,default: ''
    }
    ,endYear: {
        type: String
        ,default: ''
    }
    ,responsibilities: [{text: String}]
    ,description: {
        type: String
        ,trim: true
    }
    ,isPresent: {
        type: Boolean
        ,default: false
    }

});

var skillsSchema = new mongoose.Schema({
    name: {
        type: String
        ,trim: true
    }
    ,rating: {
        type: Number
        ,default: 0
    }
});

var languagesSchema = new mongoose.Schema({
    name: {
        type: String
        ,trim: true
    }
    ,rating: {
        type: String
        ,default: ''
    }
});

var projectsSchema = new mongoose.Schema({

    name: {
        type: String
        ,default: ''
        ,trim: true
    }
    ,url: {
        type: String
        ,default: ''
        ,trim: true
    }
    ,keywords: {
        type: String
        ,default: ''
        ,trim: true
    }
    ,startMonth: {
        type: String
        ,default: ''
    }
    ,startYear: {
        type: String
        ,default: ''
    }
    ,endMonth: {
        type: String
        ,default: ''
    }
    ,endYear: {
        type: String
        ,default: ''
    }
    ,description: {
        type: String
        ,trim: true
        ,default: ''
    }
    ,isPresent: {
        type: Boolean
        ,default: false
    }

});



var modelSchema = new mongoose.Schema({

    userId: String
    ,isLinkedIn: {
        type: Boolean
        ,default: false
    }
    ,template: {
        type: String
        ,default: 'cyan'
    }
    ,resume: {
        title: {
            type: String,
            trim: true
        }
        ,objective: {
            type: String,
            trim: true
        }
        ,headline: {
            type: String,
            trim: true
        }
        ,lblobjective: {
            type: String
            ,trim: true
            ,default: 'Objective'
        }
        ,lblexperience: {
            type: String
            ,trim: true
            ,default: 'Experience'
        }
        ,lbleducation: {
            type: String
            ,trim: true
            ,default: 'Education'
        }
    }
    ,personal: {
        firstName: {
            type: String
            ,trim: true
        }
        ,lastName: {
            type: String
            ,trim: true
        }
        ,email: {
            type: String
            ,trim: true
        }
        ,address: {
            type: String
            ,trim: true
        }
        ,website: {
            type: String
            ,trim: true
        }
        ,phone: {
            type: String
            ,trim: true
        }
        ,dob: {
            type: String
            ,trim: true
        }
        ,nationality: {
            type: String
            ,trim: true
        }
        ,maritalStatus: {
            type: String
            ,trim: true
        }
    }

    ,label: {
        glObjective: {
            type: String
            ,trim: true
            ,default: 'Objective'
        }
        ,glExperience: {
            type: String
            ,trim: true
            ,default: 'Work Experience'
        }
        ,glEducation: {
            type: String
            ,trim: true
            ,default: 'Qualification'
        }
        ,glSkills: {
            type: String
            ,trim: true
            ,default: 'Skills'
        }
        ,glLanguages: {
            type: String
            ,trim: true
            ,default: 'Languages'
        }
        ,glProjects: {
            type: String
            ,trim: true
            ,default: 'Projects'
        }
        ,glAboutMe: {
            type: String
            ,trim: true
            ,default: 'About Me'
        }
        ,piName: {
            type: String
            ,trim: true
            ,default: 'Name'
        }
        ,piDob: {
            type: String
            ,trim: true
            ,default: 'Date Of Birth'
        }
        ,piAddress: {
            type: String
            ,trim: true
            ,default: 'Address'
        }
        ,piWebsite: {
            type: String
            ,trim: true
            ,default: 'Website'
        }
        ,piPhone: {
            type: String
            ,trim: true
            ,default: 'Phone'
        }
        ,piNationality: {
            type: String
            ,trim: true
            ,default: 'Nationality'
        }
        ,piMaritalStatus: {
            type: String
            ,trim: true
            ,default: 'Marital Status'
        }
        ,skTechnical: {
            type: String
            ,trim: true
            ,default: 'Technical Skills'
        }
        ,skPersonal: {
            type: String
            ,trim: true
            ,default: 'Personal Skills'
        }
    }

    ,education: [educationSchema]
    ,experiences: [experienceSchema]
    ,skills: [skillsSchema]
    ,languages: [languagesSchema]
    ,projects: [projectsSchema]
});



var Model = module.exports = mongoose.model('Model', modelSchema);