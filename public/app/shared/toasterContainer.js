// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     20/10/14


 */

(function() {

    var iam = 'toasterDirective'
        ,deps = ['$compile', '$timeout', '$sce', 'toasterConfig', 'toaster']
        ,f = function($compile, $timeout, $sce, toasterConfig, toaster) {
            return {
                replace: true,
                restrict: 'EA',
                scope: true, // creates an internal scope for this directive
                link: function (scope, elm, attrs) {

                    console.log('taster', scope);
                    var id = 0,
                        mergedConfig;

                    mergedConfig = angular.extend({}, toasterConfig, scope.$eval(attrs.toasterOptions));

                    scope.config = {
                        position: mergedConfig['position-class'],
                        title: mergedConfig['title-class'],
                        message: mergedConfig['message-class'],
                        tap: mergedConfig['tap-to-dismiss'],
                        closeButton: mergedConfig['close-button']
                    };

                    scope.configureTimer = function configureTimer(toast) {
                        var timeout = typeof (toast.timeout) == "number" ? toast.timeout : mergedConfig['time-out'];
                        if (timeout > 0)
                            setTimeout(toast, timeout);
                    };

                    function addToast(toast) {
                        debugger;
                        toast.type = mergedConfig['icon-classes'][toast.type];
                        if (!toast.type)
                            toast.type = mergedConfig['icon-class'];

                        id++;
                        angular.extend(toast, { id: id });

                        // Set the toast.bodyOutputType to the default if it isn't set
                        toast.bodyOutputType = toast.bodyOutputType || mergedConfig['body-output-type'];
                        switch (toast.bodyOutputType) {
                            case 'trustedHtml':
                                toast.html = $sce.trustAsHtml(toast.body);
                                break;
                            case 'template':
                                toast.bodyTemplate = toast.body || mergedConfig['body-template'];
                                break;
                        }

                        scope.configureTimer(toast);

                        if (mergedConfig['newest-on-top'] === true) {
                            scope.toasters.unshift(toast);
                            if (mergedConfig['limit'] > 0 && scope.toasters.length > mergedConfig['limit']) {
                                scope.toasters.pop();
                            }
                        } else {
                            scope.toasters.push(toast);
                            if (mergedConfig['limit'] > 0 && scope.toasters.length > mergedConfig['limit']) {
                                scope.toasters.shift();
                            }
                        }
                    }

                    function setTimeout(toast, time) {
                        toast.timeout = $timeout(function () {
                            scope.removeToast(toast.id);
                        }, time);
                    }

                    scope.toasters = [];
                    scope.$on('toaster-newToast', function () {
                        addToast(toaster.toast);
                    });

                    scope.$on('toaster-clearToasts', function () {
                        scope.toasters.splice(0, scope.toasters.length);
                    });
                },
                controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

                    $scope.stopTimer = function (toast) {
                        if (toast.timeout) {
                            $timeout.cancel(toast.timeout);
                            toast.timeout = null;
                        }
                    };

                    $scope.restartTimer = function (toast) {
                        if (!toast.timeout)
                            $scope.configureTimer(toast);
                    };

                    $scope.removeToast = function (id) {
                        var i = 0;
                        for (i; i < $scope.toasters.length; i++) {
                            if ($scope.toasters[i].id === id)
                                break;
                        }
                        $scope.toasters.splice(i, 1);
                    };

                    $scope.click = function (toaster) {
                        if ($scope.config.tap === true) {
                            if (toaster.clickHandler && angular.isFunction($scope.$parent.$eval(toaster.clickHandler))) {
                                var result = $scope.$parent.$eval(toaster.clickHandler)(toaster);
                                if (result === true)
                                    $scope.removeToast(toaster.id);
                            } else {
                                if (angular.isString(toaster.clickHandler))
                                    console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.");
                                $scope.removeToast(toaster.id);
                            }
                        }
                    };
                }],
                template:
                    '<div  id="toast-container" ng-class="config.position">' +
                    '<div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)"  ng-mouseout="restartTimer(toaster)">' +
                    '<button class="toast-close-button" ng-show="config.closeButton">&times;</button>' +
                    '<div ng-class="config.title">{{toaster.title}}</div>' +
                    '<div ng-class="config.message" ng-switch on="toaster.bodyOutputType">' +
                    '<div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div>' +
                    '<div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div>' +
                    '<div ng-switch-default >{{toaster.body}}</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            };
        };

    angular.module('cv').directive(iam, deps.concat(f));
})();