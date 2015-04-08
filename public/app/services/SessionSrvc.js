// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     16/10/14


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