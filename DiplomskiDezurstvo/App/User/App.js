// kreiraj user module
var userModule = angular.module('userModule', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/user', { templateUrl: '/App/User/Views/User.html', controller: 'userViewModel' });
        $routeProvider.when('/user/sendmessage', { templateUrl: '/App/User/Views/UserSendMessage.html', controller: 'userViewModel' });
        $routeProvider.otherwise({ redirectTo: '/user' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj user module u glavni modul
mainModule.requires.push('userModule');

// kreiraj user controller
userModule.controller("userViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $timeout, ApiRequest) {

    // setuj promenljive za prikaz poruka na false
    $scope.sendSuccess = false;
    $scope.sendFaild = false;

    // kreiraj objekat koji ce da sadrzi sve obaveze
    $scope.ListaAktuelnosti = {};

    // promenljiva koja sakriva/prikazuje tablelu u zavisnosti od dobijenih rezultata
    $scope.emptyList = false;

    // funkcija za ucitavanje svih aktivnosti za korsnika
    $scope.GetListAktuelnosti = function () {

        var successCallback = function (response) {
            // na uspesan poziv ucitaj podatke u objekat
            $scope.ListaAktuelnosti = response.data;
            if (response.data.length == 0) {
                $scope.emptyList = true;
            }
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        // autorizovani GET request
        ApiRequest.authorize("GET", "/Api/User", "", successCallback, errorCallback);
    };
    // ucitaj aktuelnosti na pageload
    $scope.GetListAktuelnosti();

    // na klik dugmeta 'Kontaktiraj administratora' pokazi formu
    $scope.sendEmail = function () {
        $location.path('/user/sendmessage');
    };


    var redirect = function () {
        $location.path('user');
    };

    // posalji poruku administratoru
    $scope.send = function () {

        var successCallback = function (response) {
            $scope.sendSuccess = true;
            $scope.sendFaild = false;
            $timeout(redirect, 3000);
        };

        var errorCallback = function (response) {
            $scope.sendSuccess = false;
            $scope.sendFaild = true;
        };

        var data = {
            AsistentID: $scope.ListaAktuelnosti[0].AsistentID,
            Ime: $scope.ListaAktuelnosti[0].Ime,
            Prezime: $scope.ListaAktuelnosti[0].Prezime,
            Poruka: $scope.AdminMessage
        };

        ApiRequest.authorize("POST", "/Api/User/?action=switch", data, successCallback, errorCallback);
    };

    $scope.goBack = function () {
        $location.path('user');
    };
});

