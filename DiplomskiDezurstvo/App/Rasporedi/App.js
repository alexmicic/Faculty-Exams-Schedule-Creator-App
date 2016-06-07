// rasporedi module
var rasporediModule = angular.module('rasporediModule', ['ngRoute', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/rasporedi', { templateUrl: '/App/Rasporedi/Views/RasporediList.html', controller: 'rasporediViewModel' });
        $routeProvider.when('/rasporedi/:rasporedID', { templateUrl: '/App/Rasporedi/Views/Raspored.html', controller: 'rasporedViewModel' });
        $routeProvider.when('/rasporedi/dan/:rasporedID', { templateUrl: '/App/Rasporedi/Views/RasporedDani.html', controller: 'rasporedDaniViewModel' });
        $routeProvider.when('/rasporedi/dan/:rasporedID/edit/:rasporedDanID', { templateUrl: '/App/Rasporedi/Views/RasporedEdit.html', controller: 'rasporedEditViewModel' });
        $routeProvider.otherwise({ redirectTo: '/rasporedi' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj rasporedi module u glavni modul
mainModule.requires.push('rasporediModule');

// rasporedi controller
rasporediModule.controller("rasporediViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {


    //objekat Raspored Main
    $scope.rasporedMain = {
        Naziv: ""
    };
    var RasporedMainInfo = angular.copy($scope.rasporedMain);


    $scope.RasporedMainAddSucess = false;
    $scope.RasporedMainAddFailed = false;
    $scope.showEntryForm = false;

    //poziv za ucitavanje svih predmeta
    $scope.ListaRasporediMain = {};

    $scope.GetListRasporediMain = function () {
        
        var successCallback = function (response) {
            //console.log(response);
            $scope.ListaRasporediMain = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Rasporedi", "", successCallback, errorCallback);
    };
    // ucitaj rasporede Main
    $scope.GetListRasporediMain();

    // azuriraj podatke o rasporedu Main
    $scope.updateRasporedMain = function (RasporedMainID) {
        $location.path('rasporedi/' + RasporedMainID);
        //console.log(id);
    };

    // kreiraj raspored po danu
    $scope.configureRasporedMain = function (RasporedMainID) {
        $location.path('rasporedi/dan/' + RasporedMainID);
        //console.log(id);
    };

    // obrisi raspored Main
    $scope.deleteRasporedMain = function (RasporedMainID) {
        var successCallback = function (response) {
            $scope.GetListRasporediMain();
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        var data = {
            id: RasporedMainID
        }

        ApiRequest.authorize("DELETE", "/Api/Rasporedi/" + RasporedMainID, data, successCallback, errorCallback);
    };

    // na klik prikazi div za dodavanje rasporeda Main
    $scope.showForm = function () {

        if (!$scope.showEntryForm) {
            $scope.showEntryForm = true;
            $scope.class = "up";
        } else {
            $scope.showEntryForm = false;
            $scope.class = "";
        }

        $scope.RasporedMainAddSucess = false;
        $scope.RasporedMainAddFailed = false;
    };

    // dodaj raspored Main
    $scope.addRasporedMain = function () {

        var successCallback = function (response) {
            $scope.showEntryForm = false;
            $scope.RasporedMainAddSucess = true;
            $scope.class = "";
            // refresuj rasporede Main
            $scope.GetListRasporediMain();
            
            $scope.rasporedMain = angular.copy(RasporedMainInfo);
            $scope.addRasporedMainForm.$setPristine();
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.RasporedMainAddFailed = true;
        };

        var data = {
            Naziv: $scope.rasporedMain.Naziv
        };

        ApiRequest.authorize("POST", "/Api/Rasporedi", data, successCallback, errorCallback);
    };

    // na klik posalji email svim asistentima
    $scope.sendEmail = function (RasporedID) {
        var successCallback = function (response) {
            console.log(response);
            $scope.RasporedMainEmailSucess = true;
        };

        var errorCallback = function (response) {
            $scope.RasporedMainEmailFailed = true;
        };

        // salje autorizovani POST request sa ID-jem rasporeda
        ApiRequest.authorize("POST", "/Api/Rasporedi/send/?action=send&idRaspored=" + RasporedID, "", successCallback, errorCallback);
    }
});