// kreiraj izvestaj module
var izvestajModule = angular.module('izvestajModule', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/izvestaj', { templateUrl: '/App/Izvestaj/Views/Izvestaj.html', controller: 'izvestajViewModel' });
        $routeProvider.otherwise({ redirectTo: '/izvestaj' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj izvestaj module u glavni modul
mainModule.requires.push('izvestajModule');

// kreiraj izvestaj controller
izvestajModule.controller("izvestajViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $timeout, ApiRequest) {

    // kreiraj novi objekat u koji ce biti ucitani svi podaci
    $scope.Izvestaj = {};

    $scope.GetIzvestaj = function () {

        // inicijalizuj horizBarChart jQuery plugin
        var chart = function () {
            $('.chart').horizBarChart({
                selector: '.bar',
                speed: 1000
            });
        };

        // popuni objekat Izvestaj
        var successCallback = function (response) {
            $scope.Izvestaj = response.data;
            $timeout(chart, 250);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        // GET request za dobijanje podataka
        ApiRequest.authorize("GET", "/Api/Izvestaj", "", successCallback, errorCallback);
    };

    // na pageload ucitaj podatke
    $scope.GetIzvestaj();

    // klik na dugme 'Stampaj' izvlaci <div> u kojem sa nalazi tabela, otvara novi prozor i ukljucuje kontrole stampanja
    $scope.print = function (divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=800,height=600');
        popupWin.document.open()
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/Content/print.css" /></head><body onload="window.print()">' + printContents + '</html>');
        popupWin.document.close();
    }

});