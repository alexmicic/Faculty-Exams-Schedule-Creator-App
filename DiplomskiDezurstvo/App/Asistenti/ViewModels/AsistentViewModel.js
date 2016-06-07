// asisitent controller
asistentiModule.controller("asistentViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    $scope.asistentID = $routeParams.asistentID;

    $scope.UserUpdateSucess = false;
    $scope.UserUpdateFailed = false;

    //poziv za ucitavanje podataka o asistentu
    $scope.asistent = {
        Email: "",
        Sifra: "",
        Ime: "",
        Prezime: "",
        Telefon: ""
    };

    $scope.GetAsistent = function () {

        var successCallback = function (response) {
            //console.log(response.data);
            delete response.data["RasporedAsistenti"];
            $scope.asistent = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Asistenti/" + $scope.asistentID, "", successCallback, errorCallback);
    };
    // ucitaj asistente
    $scope.GetAsistent();

    $scope.updateUser = function () {
        var successCallback = function (response) {
            $location.path('asistenti');
            $scope.UserUpdateSucess = true;
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.UserUpdateFailed = true;
        };

        ApiRequest.authorize("PUT", "/Api/Asistenti/" + $scope.asistentID, $scope.asistent, successCallback, errorCallback);
    };

    $scope.goBack = function () {
        $location.path('asistenti');
    };
});
