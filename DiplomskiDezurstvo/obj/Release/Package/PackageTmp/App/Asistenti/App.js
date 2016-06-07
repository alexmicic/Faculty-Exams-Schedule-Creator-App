// asisitenti module
var asistentiModule = angular.module('asistentiModule', ['ngRoute', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/asistenti', { templateUrl: '/App/Asistenti/Views/AsistentiList.html', controller: 'asistentiViewModel' });
        $routeProvider.when('/asistenti/:asistentID', { templateUrl: '/App/Asistenti/Views/Asistent.html', controller: 'asistentViewModel' });
        $routeProvider.otherwise({ redirectTo: '/asistenti' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj asistenti module u glavni modul
mainModule.requires.push('asistentiModule');

// asistenti controller
asistentiModule.controller("asistentiViewModel", function ($scope, $http, $q, $routeParams, $window, $location, ApiRequest) {

    //objekat Asistent
    $scope.asistent = {
        Email: "",
        Sifra: "",
        Ime: "",
        Prezime: "",
        Telefon: ""
    };
    var AsistentInfo = angular.copy($scope.asistent);


    $scope.UserAddSucess = false;
    $scope.UserAddFailed = false;
    $scope.showEntryForm = false;

    //poziv za ucitavanje svih asistenata
    $scope.ListaAsistenata = {};

    $scope.GetListAsistenata = function () {
        
        var successCallback = function (response) {
            //console.log(response);
            $scope.ListaAsistenata = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Asistenti", "", successCallback, errorCallback);
    };
    // ucitaj asistente
    $scope.GetListAsistenata();

    // azuriraj podatke o asistentu
    $scope.updateUser = function (AsistentID) {
        $location.path('asistenti/' + AsistentID);
        //console.log(id);
    };

    // obrisi asistenta
    $scope.deleteUser = function (AsistentID) {
        var successCallback = function (response) {
            $scope.GetListAsistenata();
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        var data = {
            id: AsistentID
        }

        ApiRequest.authorize("DELETE", "/Api/Asistenti/" + AsistentID, data, successCallback, errorCallback);
    };

    // na klik prikazi div za dodavanje asistenata
    $scope.showForm = function () {

        if (!$scope.showEntryForm) {
            $scope.showEntryForm = true;
            $scope.class = "up";
        } else {
            $scope.showEntryForm = false;
            $scope.class = "";
        }

        var userPassword = randomPassword();
        $('#userPassword').val(userPassword);

        $scope.UserAddSucess = false;
        $scope.UserAddFailed = false;
        $scope.asistent.Password = userPassword;
    };

    // dodaj asistenta
    $scope.addUser = function () {

        var successCallbackRegister = function (response) {
            // dodaj u Asistenti tabelu
            ApiRequest.authorize("POST", "/Api/Asistenti", dataInfo, successCallbackUser, errorCallbackUser);
            //console.log(response);
        };

        var successCallbackUser = function (response) {
            $scope.showEntryForm = false;
            $scope.UserAddSucess = true;
            $scope.class = "";
            // refresuj asistente
            $scope.GetListAsistenata();
            
            $scope.asistent = angular.copy(AsistentInfo);
            $scope.addUserForm.$setPristine();
        };

        var errorCallbackRegister = errorCallbackUser = function (response) {
            //console.log(response);
            $scope.UserAddFailed = true;
        };

        var dataLogin = {
            Email: $scope.asistent.Email,
            Password: $scope.asistent.Password,
            ConfirmPassword: $scope.asistent.Password
        };

        var dataInfo = {
            Email: $scope.asistent.Email,
            Sifra: $scope.asistent.Password,
            Ime: $scope.asistent.Ime,
            Prezime: $scope.asistent.Prezime,
            Telefon: $scope.asistent.Telefon
        };

        var config = {
            headers: 'application/json;charset=utf-8'
        };

        // dodaj u user tabelu
        $http.post('/Api/Account/Register', dataLogin, config).then(successCallbackRegister, errorCallbackRegister);
    };
});

// auto generate password
function randomPassword() {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOPQRSTUVWXVZ1234567890";
    var length = 10;
    var password = "!1Dp";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        password += chars.charAt(i);
    }
    return password;
}