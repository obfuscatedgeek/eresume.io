// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     12/10/14


 */
(function() {


    var iam = 'UserSrvc'
        ,dependants = ['$http', '$window', 'ROLES', 'SessionSrvc']
        ,def = function($http, $window, ROLES, SessionSrvc) {
            return {


                post: function(objUser) {
                   return $http.post('/users', objUser);
                }

                ,get: function(objUser) {
                    return $http
                        .post('/login', objUser)
                        .then(function(res) {
                            var me = this;
                            if(res.data.token) {
                                $window.sessionStorage.token = res.data.token;

                                // store the session for later uses
                                SessionSrvc.setSession(res.data);

                                return {success:true, message: 'Welcome '+res.data.username};
                            } else {
                                delete $window.sessionStorage.token;
                                SessionSrvc.destroySession();
                                return {success:false, message: res.data.message};
                            }
                        });
                }

                ,logout: function() {
                    delete $window.sessionStorage.token;
                    SessionSrvc.destroySession();
                    return ({success: true, message: 'Thank you for visiting us :-)'});
                }

                ,getResumes: function() {

                    return $http.post('/all')
                        .then(function(res) {
                            return res.data;
                        });
                }

                ,deleteProfile: function() {

                    return $http.delete('/users')
                        .then(function(res) {

                            console.log(res);

                            return res.data;

                        });

                }


                ,sendMessage: function(objMessage) {

                    return $http.post('/email', {data: objMessage})
                        .then(function(res) {
                            return res.data;
                        });
                }

                ,getRecoverPassword: function(emailId) {
                    return $http.post('/pass', {email: emailId})
                        .then(function(res) {
                            return res.data;
                        });
                }

                ,sendActivationLink: function(emailId) {
                    return $http.post('/activation', {email: emailId})
                        .then(function(res) {
                            return res.data;
                        });
                }
            };
        }


    angular.module('cv').factory(iam, dependants.concat(def));
})();
