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
 Date:     29/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

var mongoose = require('mongoose')
    ,jwt = require('jsonwebtoken')
    ,nodemailer = require('nodemailer');
;

var get = function(req, res) {
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

                    if(rec[0].isActive) {
                        token = jwt.sign(rec[0], app.get('SECRET_TOKEN'), {expiresInMinutes: 60*5});
                        res.json({token: token, username: rec[0].email});
                    } else {
                        res.send({success: false, message: 'Please activate your account.'});
                    }



                } else {
                    res.json({success:false, message: 'Incorrect login, check your credentials & try again.'});
                }

            }
        }
    );

};

var put = function(req, res) {
    res.send('hello putting !!!');
};

var del = function(req, res) {

    var User = mongoose.model('User')
        ,token = req.headers.authorization.split('Bearer ')[1]
        ,userId = jwt.decode(token)._id
    ;

    User.remove({_id: userId}, function(err) {
        if(err) {
            res.send({success: false, message: err});
        } else {
            res.send({success: true, message: 'Profile deleted successfully !!'});
        }
    });
};

var post = function(req,res) {

    var User = mongoose.model('User')
        ,activationCode = new Array(10).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);})
        ,transporter = nodemailer.createTransport()
        ,emailId = req.body.username
        ;

    User.create({
        email: req.body.username
        ,password: req.body.password
        ,activationLink: activationCode
    }, function(err, usr) {
        if(err) {
            res.send({success:false, message: 'Duplicate username, please register with a different email id'});
        } else {

            console.log("****", emailId);

            transporter.sendMail({
                from: APPLICATION_FROM_EMAIL,
                to: req.body.username,
                subject: 'eresume.io  | Account created, please activate',
                text: 'Please click the following link or paste it in your browser address bar to activate your account '+APPLICATION_URL+'activation?link='+activationCode+'&account='+req.body.username
            }, function(err, d) {
                if(err) {
                    res.send({success: false, message: 'error sending email'});
                } else {
                    //res.send({success: true, message: 'Activate link has been sent to your email id.'});
                    res.json({success:true, message: 'Account successfully created. Please check your email to activate your account.'});
                }
            });
        }
    });
};

var getResumes = function(req, res) {

    var Model = mongoose.model('Model')
        ,token = req.headers.authorization.split('Bearer ')[1]
        ;
    Model.find({userId: jwt.decode(token)._id}, {resume:1, isLinkedIn: 1, template: 1}, function(err, docs) {

        if(err) {
            res.send(err);
        } else {
            res.send(docs);
        }
    });
};


var sendEmail = function(req, res) {

    var transporter = nodemailer.createTransport();
    transporter.sendMail({
        from:APPLICATION_FROM_EMAIL,
        to: 'ejazzz@gmail.com',
        subject: 'eresume.io | lined dropped',
        text: JSON.stringify(req.body.data)
    }, function(err, d) {
        if(err) {
            res.send({success: false, message: 'error sending email'});
        } else {
            res.send({success: true, message: 'Email sent successfulll !!'});
        }
    });
};




var recoverPass = function(req, res) {


    var emailId = req.body.email
        ,User = mongoose.model('User')
        ,transporter = nodemailer.createTransport();
    ;

    if(!emailId || emailId.length < 3) {

        res.send({success: false, message: 'Invalid email id.'})
        return;
    }

    User.find({email: emailId}, function(err, doc) {

        if(err) {
            res.send({success: false, message: err});
        } else {
            if(doc.length === 1) {

                transporter.sendMail({
                    from: APPLICATION_FROM_EMAIL,
                    to: emailId || 'ejazzz@gmail.com',
                    subject: 'eresume.io | Password recovery',
                    text: 'Your password for the email id '+emailId+' is '+doc[0].password
                }, function(err, d) {
                    if(err) {
                        res.send({success: false, message: 'error sending email'});
                    } else {
                        res.send({success: true, message: 'Password successfully sent to your email id.'});
                    }
                });

            } else {
                res.send({success: false, message: 'Invalid email id'});
            }
        }

    });
};




var sendActivation = function(req, res) {

    var emailId = req.body.email
        ,transporter = nodemailer.createTransport()
        ,User = mongoose.model('User');
    ;



    if(!emailId || emailId.length < 3) {

        res.send({success: false, message: 'Invalid email id.'})
        return;
    }

    User.find({email: emailId}, function(err, doc) {

        if(err) {
            res.send({success: false, message: err});
        } else {
            if(doc.length === 1) {


                // return if account already active
                if(doc[0].isActive) {
                    res.send({success: true, message: 'Account already activated, please continue to login.'});
                    return;
                }

                transporter.sendMail({
                    from: 'ejazzz@gmail.com',
                    to: emailId || 'ejazzz@gmail.com',
                    subject: 'eresume.io | Activation link',
                    text: 'Please click the following link or paste it in your browser address bar to activate your account '+APPLICATION_URL+'/activation?link='+doc[0].activationLink
                }, function(err, d) {
                    if(err) {
                        res.send({success: false, message: 'error sending email'});
                    } else {
                        res.send({success: true, message: 'Activate link has been sent to your email id.'});
                    }
                });

            } else {
                res.send({success: false, message: 'Invalid email id'});
            }
        }

    });


};


var getActivation = function(req, res) {


    var activationCode = req.query.link
        ,emailId = req.query.account
        ,User = mongoose.model('User')
    ;
    User.findOneAndUpdate({activationLink: activationCode, email: emailId}, {isActive: true}, function(err, doc) {

        console.log(doc);
        if(err) {
            res.render('app/home/activated.ejs', {title: 'Activation failed', success: false, message: 'Recheck the activation link'});
        } else {

            if(!doc) {
                res.render('app/home/activated.ejs', {title: 'Incorrect activation url.', success: false, message: 'Recheck the activation link'});
            } else {
                res.render('app/home/activated.ejs', {title: 'Activation successful :-)', success: false, message: 'You will be automatically redirected to the application.'});
            }

        }
    });
};


module.exports = {
    get: get
    ,getResumes: getResumes
    ,put: put
    ,post: post
    ,del: del
    ,sendEmail: sendEmail
    ,recoverPass: recoverPass
    ,sendActivation: sendActivation
    ,getActivation: getActivation
}