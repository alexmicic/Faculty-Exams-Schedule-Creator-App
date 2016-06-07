// kreiraj profile module
var profileModule = angular.module('profileModule', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/profil', { templateUrl: '/App/Profil/Views/Profil.html', controller: 'profileViewModel' });
        $routeProvider.otherwise({ redirectTo: '/profil' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj profile module u glavni modul
mainModule.requires.push('profileModule');

// kreiraj profile controller
profileModule.controller("profileViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    // promenljive za postavlanje nove lozinke
    $scope.OldPassword = "";
    $scope.NewPassword = "";
    // setuj prika poruka na false
    $scope.messageFailed = false;
    $scope.messageSuccess = false;

    // na klik posalji POST request 
    $scope.UpdatePassword = function () {

        // kreiraj objekat za slanje
        var data = {
            "OldPassword": $scope.OldPassword,
            "NewPassword": $scope.NewPassword,
            "ConfirmPassword": $scope.NewPassword
        };

        // na uspesno azuriranje prikazati poruku
        var successCallback = function (response) {
            $scope.messageSuccess = true;
            $scope.OldPassword = "";
            $scope.NewPassword = "";
        };

        // na neuspesno azuriranje prikazati poruku
        var errorCallback = function (response) {
            $scope.message = response.data.Message;
            $scope.messageFailed = true;
            $scope.OldPassword = "";
            $scope.NewPassword = "";
        };

        // autorizovani POST request 
        ApiRequest.authorize("POST", "/Api/Account/ChangePassword", data, successCallback, errorCallback);
    };
});
