// predmet controller
predmetiModule.controller("predmetViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    $scope.predmetID = $routeParams.predmetID;

    $scope.PredmetUpdateSucess = false;
    $scope.PredmetUpdateFailed = false;

    //poziv za ucitavanje podataka o predmetu
    $scope.predmet = {
        Naziv: ""
    };

    $scope.GetPredmet = function () {

        var successCallback = function (response) {
            //console.log(response.data);
            delete response.data["RasporedPredmeti"];
            $scope.predmet = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Predmeti/" + $scope.predmetID, "", successCallback, errorCallback);
    };
    // ucitaj asistente
    $scope.GetPredmet();

    $scope.updatePredmet = function () {
        var successCallback = function (response) {
            $location.path('predmeti');
            $scope.PredmetUpdateSucess = true;
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.PredmetUpdateFailed = true;
        };

        ApiRequest.authorize("PUT", "/Api/Predmeti/" + $scope.predmetID, $scope.predmet, successCallback, errorCallback);
    };

    $scope.goBack = function () {
        $location.path('predmeti');
    };
});
