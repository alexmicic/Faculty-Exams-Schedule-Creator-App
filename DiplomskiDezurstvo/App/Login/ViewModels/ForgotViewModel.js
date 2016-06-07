// kreiraj forgot controller unutar login modula
loginModule.controller('forgotViewModel', function ($scope, $http, $q, $routeParams, $window, $location, $logincheck, $timeout) {

    $scope.success = false;
    $scope.error = false;

    // email adresa korisnika
    $scope.username = "";

    // vrati korisnika na login formu ukoliko je sve u redu
    var redirect = function(){
        $location.path('/login');
    };

    // klik na dugme aktivira novi POST request
    $scope.userForgot = function () {

        var successCallback = function (response) {
            $scope.success = true;
            $scope.error = false;
            $timeout(redirect, 3000);
        };

        var errorCallback = function (response) {
            $scope.success = false;
            $scope.error = true;
        };

        var data = {
            Email: $scope.username
        }

        $http({
            method: "POST",
            url: "/Api/Account/ForgotPassword",
            data: data
        }).then(successCallback, errorCallback);
    };
});