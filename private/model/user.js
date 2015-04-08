// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     14/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

var mongoose = require('mongoose');
//    ,autoIncrement = require('mongoose-auto-increment');

var userSchema = new mongoose.Schema({
    password: String
    ,email: {
        type: String
        ,unique: true
    }
    ,isActive: {
        type: Boolean
        ,default: false
    }
    ,activationLink: {
        type: String
    }
    ,createdAt: {
        type: Date
        ,default: Date.now
    }
    ,updatedAt: {
        type: Date
        ,default: Date.now
    }
});
//userSchema.plugin(autoIncrement.plugin, 'User');
var User = module.exports = mongoose.model('User', userSchema);