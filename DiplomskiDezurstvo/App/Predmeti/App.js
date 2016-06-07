// kreiraj predmeti module
var predmetiModule = angular.module('predmetiModule', ['ngRoute', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/predmeti', { templateUrl: '/App/Predmeti/Views/PredmetiList.html', controller: 'predmetiViewModel' });
        $routeProvider.when('/predmeti/:predmetID', { templateUrl: '/App/Predmeti/Views/Predmet.html', controller: 'predmetViewModel' });
        $routeProvider.otherwise({ redirectTo: '/predmeti' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj predmeti module u glavni modul
mainModule.requires.push('predmetiModule');

// kreiraj predmeti controller
predmetiModule.controller("predmetiViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $timeout, ApiRequest) {

    // kreiraj objekat Predmet
    $scope.predmet = {
        Naziv: ""
    };

    // kopiraj prazan objekat Predmet za kasnije brisanje forme, kod dodavanja novog predmeta
    var PredmetInfo = angular.copy($scope.predmet);

    // setuj promenljive zaduzene za prikaz statusa kod dodavanja novog predmeta
    $scope.PredmetAddSucess = false;
    $scope.PredmetAddFailed = false;
    $scope.showEntryForm = false;

    // objekat kojem ce biti dodeljeni svi ucitani predmeti iz baze podataka
    $scope.ListaPredmeta = {};

    // funkcija za slanje GET requesta i ucitavanje svih predmeta
    $scope.GetListPredmeta = function () {
        // dodaj mogucnost filtriranja kroz tabelu
        var filter = function () {
            $('.predmeti-list').filterTable({
                placeholder: 'Filter',
                label: '',
                minRows: 8
            });
        };

        var successCallback = function (response) {
            //console.log(response);
            $scope.ListaPredmeta = response.data;
            $timeout(filter, 500);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        // salje autorizovani GET request
        ApiRequest.authorize("GET", "/Api/Predmeti", "", successCallback, errorCallback);
    };

    // ucitaj predmete na pageload
    $scope.GetListPredmeta();

    // na klik idi na formu za azuriranje podataka o predmetu
    $scope.updatePredmet = function (PredmetID) {
        $location.path('predmeti/' + PredmetID);
    };

    // na klik obrisi predmet
    $scope.deletePredmet = function (PredmetID) {
        var successCallback = function (response) {
            $scope.GetListPredmeta();
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        var data = {
            id: PredmetID
        }

        ApiRequest.authorize("DELETE", "/Api/Predmeti/" + PredmetID, data, successCallback, errorCallback);
    };

    // na klik prikazi div za dodavanje predmeta
    $scope.showForm = function () {

        if (!$scope.showEntryForm) {
            $scope.showEntryForm = true;
            $scope.class = "up";
        } else {
            $scope.showEntryForm = false;
            $scope.class = "";
        }

        $scope.PredmetAddSucess = false;
        $scope.PredmetAddFailed = false;
    };

    // na klik dodaj predmet
    $scope.addPredmet = function () {

        var successCallback = function (response) {
            $scope.showEntryForm = false;
            $scope.PredmetAddSucess = true;
            // refresuj asistente
            $scope.GetListPredmeta();
            
            $scope.predmet = angular.copy(PredmetInfo);
            $scope.addPredmetForm.$setPristine();
        };

        var errorCallback = function (response) {
            $scope.PredmetAddFailed = true;
        };

        var data = {
            Naziv: $scope.predmet.Naziv
        };

        ApiRequest.authorize("POST", "/Api/Predmeti", data, successCallback, errorCallback);
    };
});