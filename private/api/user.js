// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact:  http://extjs.eu/contact
 Date:     13/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

function User() {

    var mongoose = require('mongoose')
        ,jwt = require('jsonwebtoken');

    return {

        get: function(req, res) {
            var User = mongoose.model('User')
                ,token
            ;

            User.find(
                {
                    email: req.body.username
                    ,password: req.body.password
                }
                ,function(err, rec) {
                    if(err) {
                        res.json({success:false, message: 'Incorrect login'});
                    } else {
                        if(rec.length === 1) {
                            token = jwt.sign(rec[0], app.get('SECRET_TOKEN'), {expiresInMinutes: 60*5});
                            res.json({token: token, username: rec[0].email});
                        } else {
                            res.json({success:false, message: 'Incorrect login, check your credentials & try again.'});
                        }

                    }
                }
            );

        }

        ,put: function(req, res) {
            res.send('hello putting !!!');
        }
        ,del: function(req, res) {
            res.send('we will delete, yes we will !!!');
        }

        ,post: function(req,res) {

            var User = mongoose.model('User');
            User.create({
                email: req.body.username
                ,password: req.body.password
                ,isActive: true
            }, function(err, usr) {
                if(err) {
                    res.send(err);
                } else {
                    res.json({success:true, message: 'Account successfully created. Please check your email to activate your account.'});
                }
            });

//            res.send('SUCCESS');
        }

        ,getResumes: function(req, res) {

            var Model = mongoose.model('Model')
                ,token = req.headers.authorization.split('Bearer ')[1]
            ;
            Model.find({userId: jwt.decode(token)._id}, 'resume', function(err, docs) {

                if(err) {
                    res.send(err);
                } else {
                    res.send(docs);
                }
            });
        }
    };
}


module.exports = User();


//exports.user = User;