// dashboard module
var dashboardModule = angular.module('dashboardModule', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/dashboard', { templateUrl: '/App/Dashboard/Views/Dashboard.html', controller: 'dashboardViewModel' });
        $routeProvider.when('/dashboard/uputstvo', { templateUrl: '/App/Dashboard/Views/DashboardUputstvo.html', controller: 'dashboardUputstvoViewModel' });
        $routeProvider.otherwise({ redirectTo: '/dashboard' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj dashboard module u glavni modul
mainModule.requires.push('dashboardModule');

// dashboard controller
dashboardModule.controller("dashboardViewModel", function ($scope, $http, $q, $routeParams, $window, $location) {
    $scope.uputstvo = function () {
        $location.path('dashboard/uputstvo');
    };

});

// dashboard uputstvo controller
dashboardModule.controller("dashboardUputstvoViewModel", function ($scope, $http, $q, $routeParams, $window, $location) {

});