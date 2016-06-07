// login module
var loginModule = angular.module('loginModule', ['ngRoute', 'LocalStorageModule', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/login', { templateUrl: '/App/Login/Views/Login.html', controller: 'loginViewModel' });
        $routeProvider.otherwise({ redirectTo: '/login' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj login module u glavni modul
mainModule.requires.push('loginModule');

// login controller
loginModule.controller('loginViewModel', function ($scope, $http, $q, $routeParams, $window, $location, $logincheck) {

    // ako je vec ulogovan prebaci na /Home/Dashboard
    if ($logincheck) {
        $window.location.href = '/dashboard';
    }

    $scope.message = '';
    $scope.loading = false;

    var successCallback = function (response) {
        $scope.loading = false;
        if (response.status == 200) {
            $scope.message = '';
            sessionStorage.setItem('tokenKey', response.data.access_token);
            $window.location.href = '/dashboard';
        } else {
            $scope.message = 'Dogodila se greska prilikom prijave. Molimo pokusajte ponovo.';
        }
    };

    var errorCallback = function (response) {
        $scope.loading = false;
        if (response.data.error == 'invalid_grant') {
            $scope.message = 'Email ili password nisu tacni. Molimo pokusajte ponovo.';
        } else {
            $scope.message = 'Dogodila se greska prilikom prijave. Molimo pokusajte ponovo.';
        }
    };

    var config = {
        headers: 'application/x-www-form-urlencoded;charset=utf-8'
    };

    $scope.userLogin = function () {
        if (!$logincheck) {
            var data = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
            $http.post('/Token', data, config).then(successCallback, errorCallback);
            $scope.loading = true;
        }
    }
});