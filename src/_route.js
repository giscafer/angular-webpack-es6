/**
 * Created by Giscafer
 */
let pageHtml = {};
let templs = require.context("./pages/", true, /^((?!\/test\/).)*.html$/);
let ctrls = require.context("./pages/", true, /^((?!\/test\/).)*.ctrl.js$/);
templs.keys().forEach(key => {
    pageHtml[key] = templs(key);
});

export default $routeProvider => {
    "ngInject";
    $routeProvider
        .when('/demo/home', {
            templateUrl: pageHtml['./home/home.html'],
            controller: ctrls('./home/home.ctrl.js').default,
            controllerAs: 'home',
            reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/demo/home'
        });
};
