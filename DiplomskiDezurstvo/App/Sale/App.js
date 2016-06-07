// sale module
var saleModule = angular.module('saleModule', ['ngRoute', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/sale', { templateUrl: '/App/Sale/Views/SaleList.html', controller: 'saleViewModel' });
        $routeProvider.when('/sale/:salaID', { templateUrl: '/App/Sale/Views/Sala.html', controller: 'salaViewModel' });
        $routeProvider.otherwise({ redirectTo: '/sale' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj sale module u glavni modul
mainModule.requires.push('saleModule');

// sale controller
saleModule.controller("saleViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $timeout, ApiRequest) {

    //objekat Predmet
    $scope.sala = {
        Naziv: ""
    };
    var SalaInfo = angular.copy($scope.sala);


    $scope.SalaAddSucess = false;
    $scope.SalaAddFailed = false;
    $scope.showEntryForm = false;

    //poziv za ucitavanje svih predmeta
    $scope.ListaSala = {};

    $scope.GetListSala = function () {
        
        var filter = function () {
            $('.sale-list').filterTable({
                placeholder: 'Filter',
                label: '',
                minRows: 8
            });
        };

        var successCallback = function (response) {
            //console.log(response);
            $scope.ListaSala = response.data;
            $timeout(filter, 500);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Sale", "", successCallback, errorCallback);
    };
    // ucitaj sale
    $scope.GetListSala();

    // azuriraj podatke o sali
    $scope.updateSala = function (SalaID) {
        $location.path('sale/' + SalaID);
        //console.log(id);
    };

    // obrisi predmet
    $scope.deleteSala = function (SalaID) {
        var successCallback = function (response) {
            $scope.GetListSala();
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        var data = {
            id: SalaID
        }

        ApiRequest.authorize("DELETE", "/Api/Sale/" + SalaID, data, successCallback, errorCallback);
    };

    // na klik prikazi div za dodavanje sale
    $scope.showForm = function () {

        if (!$scope.showEntryForm) {
            $scope.showEntryForm = true;
            $scope.class = "up";
        } else {
            $scope.showEntryForm = false;
            $scope.class = "";
        }

        $scope.SalaAddSucess = false;
        $scope.SalaAddFailed = false;
    };

    // dodaj salu
    $scope.addSala = function () {

        var successCallback = function (response) {
            $scope.showEntryForm = false;
            $scope.SalaAddSucess = true;
            $scope.class = "";
            // refresuj asistente
            $scope.GetListSala();
            
            $scope.sala = angular.copy(SalaInfo);
            $scope.addSalaForm.$setPristine();
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.SalaAddFailed = true;
        };

        var data = {
            Naziv: $scope.sala.Naziv
        };

        ApiRequest.authorize("POST", "/Api/Sale", data, successCallback, errorCallback);
    };
});