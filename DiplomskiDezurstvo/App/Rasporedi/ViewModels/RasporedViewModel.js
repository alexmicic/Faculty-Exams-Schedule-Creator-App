// raspored controller
rasporediModule.controller("rasporedViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    $scope.rasporedID = $routeParams.rasporedID;

    $scope.RasporedMainUpdateSucess = false;
    $scope.RasporedMainUpdateFailed = false;

    //poziv za ucitavanje podataka o rasporedu
    $scope.rasporedMain= {
        Naziv: ""
    };

    $scope.GetRasporedMain = function () {

        var successCallback = function (response) {
            //console.log(response.data);
            delete response.data["Raspored"];
            $scope.rasporedMain = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Rasporedi/" + $scope.rasporedID, "", successCallback, errorCallback);
    };
    // ucitaj raspored Main
    $scope.GetRasporedMain();

    $scope.updateRasporedMain = function () {
        var successCallback = function (response) {
            $location.path('rasporedi');
            $scope.RasporedMainUpdateSucess = true;
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.RasporedMainUpdateFailed = true;
        };

        ApiRequest.authorize("PUT", "/Api/Rasporedi/" + $scope.rasporedID, $scope.rasporedMain, successCallback, errorCallback);
    };

    $scope.goBack = function () {
        $location.path('rasporedi');
    };
});
