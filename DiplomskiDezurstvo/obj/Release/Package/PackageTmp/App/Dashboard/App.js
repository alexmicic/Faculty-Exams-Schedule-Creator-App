// dashboard module
var dashboardModule = angular.module('dashboardModule', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/dashboard', { templateUrl: '/App/Dashboard/Views/Dashboard.html', controller: 'dashboardViewModel' });
        $routeProvider.otherwise({ redirectTo: '/dashboard' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj dashboard module u glavni modul
mainModule.requires.push('dashboardModule');

// dashboard controller
dashboardModule.controller("dashboardViewModel", function ($scope, $http, $q, $routeParams, $window, $location) {

});