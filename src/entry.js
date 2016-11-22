/**
 * Created by Giscafer
 */
import './styles/index.less';
import angular from 'angular';
import ngRoute from 'angular-route';
import route from './_route.js';

angular.module('ng-app', ['ngRoute'])
    .config(route)
    .run(['$window', '$rootScope', '$location',($window, $rootScope) => {
        $window.angular=angular;
        $window.$ = angular.element;
        $rootScope.title="angular-webpack-es6";
        $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
            console.log('route changed')
        });
    }]);