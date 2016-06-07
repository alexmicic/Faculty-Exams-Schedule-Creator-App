// sala controller
saleModule.controller("salaViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    $scope.salaID = $routeParams.salaID;

    $scope.SalaUpdateSucess = false;
    $scope.SalaUpdateFailed = false;

    //poziv za ucitavanje podataka o sali
    $scope.sala= {
        Naziv: ""
    };

    $scope.GetSala = function () {

        var successCallback = function (response) {
            //console.log(response.data);
            delete response.data["RasporedSale"];
            $scope.sala = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Sale/" + $scope.salaID, "", successCallback, errorCallback);
    };
    // ucitaj asistente
    $scope.GetSala();

    $scope.updateSala = function () {
        var successCallback = function (response) {
            $location.path('sale');
            $scope.SalaUpdateSucess = true;
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.SalaUpdateFailed = true;
        };

        ApiRequest.authorize("PUT", "/Api/Sale/" + $scope.salaID, $scope.sala, successCallback, errorCallback);
    };

    $scope.goBack = function () {
        $location.path('sale');
    };
});
