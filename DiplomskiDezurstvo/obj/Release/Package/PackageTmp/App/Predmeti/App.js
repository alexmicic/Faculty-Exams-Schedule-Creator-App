// predmeti module
var predmetiModule = angular.module('predmetiModule', ['ngRoute', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/predmeti', { templateUrl: '/App/Predmeti/Views/PredmetiList.html', controller: 'predmetiViewModel' });
        $routeProvider.when('/predmeti/:predmetID', { templateUrl: '/App/Predmeti/Views/Predmet.html', controller: 'predmetViewModel' });
        $routeProvider.otherwise({ redirectTo: '/predmeti' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj predmeti module u glavni modul
mainModule.requires.push('predmetiModule');

// predmeti controller
predmetiModule.controller("predmetiViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    //objekat Predmet
    $scope.predmet = {
        Naziv: ""
    };
    var PredmetInfo = angular.copy($scope.predmet);


    $scope.PredmetAddSucess = false;
    $scope.PredmetAddFailed = false;
    $scope.showEntryForm = false;

    //poziv za ucitavanje svih predmeta
    $scope.ListaPredmeta = {};

    $scope.GetListPredmeta = function () {
        
        var successCallback = function (response) {
            //console.log(response);
            $scope.ListaPredmeta = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Predmeti", "", successCallback, errorCallback);
    };
    // ucitaj predmete
    $scope.GetListPredmeta();

    // azuriraj podatke o predmetu
    $scope.updatePredmet = function (PredmetID) {
        $location.path('predmeti/' + PredmetID);
        //console.log(id);
    };

    // obrisi predmet
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

    // dodaj predmet
    $scope.addPredmet = function () {

        var successCallback = function (response) {
            $scope.showEntryForm = false;
            $scope.PredmetAddSucess = true;
            $scope.class = "";
            // refresuj asistente
            $scope.GetListPredmeta();
            
            $scope.predmet = angular.copy(PredmetInfo);
            $scope.addPredmetForm.$setPristine();
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.PredmetAddFailed = true;
        };

        var data = {
            Naziv: $scope.predmet.Naziv
        };

        ApiRequest.authorize("POST", "/Api/Predmeti", data, successCallback, errorCallback);
    };
});