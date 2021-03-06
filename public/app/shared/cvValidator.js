// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     12/10/14


 */

(function() {

    var iam = 'cvValidator'
        ,deps = []
        ,def  = function() {

            return {
                restrict: 'A'
                ,require: '^ngModel'
                ,scope: true
                ,link: function($scope, element, attr, ctrl) {

                    var alValidators = attr.cvValidator.split(';');


                    if(attr.equalsfield) {
                        $scope.$watch(attr.equalsfield, function(newVal, oldVal) {
                            ctrl.$setValidity('equalToField', newVal === ctrl.$viewValue);
                            return;
                        });
                    }


                    angular.forEach(alValidators, function(value, key) {

                        var type = value.split(':');


                        switch(type[0]) {
                            case 'minlength':
                                ctrl.$parsers.push(function(val) {

                                    if(!val) {
                                        return val;
                                    }

                                    if(val.length < parseInt(type[1], 10)) {
                                        ctrl.$setValidity(type[0], false);
                                    } else {
                                        ctrl.$setValidity(type[0], true);
                                    }
                                    return val;
                                });
                                break;

                            case 'maxlength':
                                ctrl.$parsers.push(function(val) {
                                    if(!val) {
                                        return val;
                                    }

                                    if(val.length > parseInt(type[1], 10)) {
                                        ctrl.$setValidity(type[0], false);
                                    } else {
                                        ctrl.$setValidity(type[0], true);
                                    }
                                    return val;
                                });
                                break;

                            case 'equalToField':
                                ctrl.$parsers.push(function(val) {
                                    if(!val) {
                                        return val;
                                    }

                                    if(val !== attr.equal2field) {
                                        ctrl.$setValidity(type[0], false);
                                    } else {
                                        ctrl.$setValidity(type[0], true);
                                    }
                                    return val;
                                });
                                break;

                            case 'required':
                                ctrl.$parsers.push(function(val) {

                                    if(!val) {
                                        return val;
                                    }
                                    if(!val || val.trim().length  === 0) {
                                        ctrl.$setValidity(type[0], false);
                                    } else {
                                        ctrl.$setValidity(type[0], true);
                                    }
                                    return val;
                                });
                                break;
                        }
                    });
                }
            }
        }


    angular.module('cv').directive(iam, deps.concat(def));
})();