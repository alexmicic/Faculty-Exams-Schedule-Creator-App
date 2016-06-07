// kreiraj login module i dodaj rutiranje
var loginModule = angular.module('loginModule', ['ngRoute', 'LocalStorageModule', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/login', { templateUrl: '/App/Login/Views/Login.html', controller: 'loginViewModel' });
        $routeProvider.when('/login/forgot', { templateUrl: '/App/Login/Views/ForgotPassword.html', controller: 'forgotViewModel' });
        $routeProvider.when('/login/reset', { templateUrl: '/App/Login/Views/ResetPassword.html', controller: 'resetViewModel' });
        $routeProvider.otherwise({ redirectTo: '/login' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj login module u glavni modul
mainModule.requires.push('loginModule');

// kreiraj login controller
loginModule.controller('loginViewModel', function ($scope, $http, $q, $routeParams, $window, $location, $logincheck) {

    // ako je korisnik vec ulogovan prebaci na /Home/Dashboard
    if ($logincheck) {
        $window.location.href = '/dashboard';
    }

    // fokus na element forme email adresa
    $('#loginForm input:first').focus();

    $scope.message = ''; // poruka ukoliko dodje do greske
    $scope.loading = false; // loading indikator

    // callback funkcija ukoliko sve bude u redu
    var successCallback = function (response) {
        $scope.loading = false;
        if (response.status == 200) {
            $scope.message = '';
            sessionStorage.setItem('tokenKey', response.data.access_token);
            $window.location.href = '/dashboard';
        } else {
            $scope.message = 'Dogodila se greška prilikom prijave. Molimo pokušajte ponovo.';
        }
    };

    // callback funkcija ukoliko dodje do greske
    var errorCallback = function (response) {
        $scope.loading = false;
        if (response.data.error == 'invalid_grant') {
            $scope.message = 'Email adresa ili lozinka nisu tačni. Molimo pokušajte ponovo.';
        } else {
            $scope.message = 'Dogodila se greška prilikom prijave. Molimo pokušajte ponovo.';
        }
    };

    // podesi hedere kod slanja POST requesta
    var config = {
        headers: 'application/x-www-form-urlencoded;charset=utf-8'
    };

    // klik na dugme aktivira POST request
    $scope.userLogin = function () {
        if (!$logincheck) { // provera da korisnik nije vec ulogovan
            var data = "grant_type=password&username=" + $scope.username + "&password=" + $scope.password;
            $http.post('/Token', data, config).then(successCallback, errorCallback);
            $scope.loading = true;
        }
    }

    // idi na /login/forgot
    $scope.passwordRecovery = function () {
        $location.path('/login/forgot');
    };
});