// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     14/10/14


 */

var mongoose = require('mongoose')
    ,strConnection = 'mongodb://localhost/resume' //root:elephant@localhost:27017;
;


mongoose.connect(strConnection);



mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to '+strConnection);
});



mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error' + err);
});


mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});


process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
    });
});


require('./user');
require('./model');
