// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     22/10/14


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