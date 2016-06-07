// kreiraj asisitenti module
var asistentiModule = angular.module('asistentiModule', ['ngRoute', 'loginCheck'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/asistenti', { templateUrl: '/App/Asistenti/Views/AsistentiList.html', controller: 'asistentiViewModel' });
        $routeProvider.when('/asistenti/:asistentID', { templateUrl: '/App/Asistenti/Views/Asistent.html', controller: 'asistentViewModel' });
        $routeProvider.otherwise({ redirectTo: '/asistenti' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    });

// dodaj asistenti module u glavni modul
mainModule.requires.push('asistentiModule');

// kreiraj asistenti controller
asistentiModule.controller("asistentiViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $timeout, ApiRequest) {

    // kreiraj objekat Asistent
    $scope.asistent = {
        Email: "",
        Sifra: "",
        Ime: "",
        Prezime: "",
        Telefon: ""
    };

    // kopiraj prazan objekat u novu promenljivu, sluzice kasnije da ocisti $scope
    var AsistentInfo = angular.copy($scope.asistent);

    // setuj varijable za prikaz poruka i show/hide forme za dodavanje novog asistenta
    $scope.UserAddSucess = false;
    $scope.UserAddFailed = false;
    $scope.showEntryForm = false;

    // objekat koji ce da popuni poziv za ucitavanje svih asistenata iz baza podataka
    $scope.ListaAsistenata = {};

    // funckcija koja salje GET request
    $scope.GetListAsistenata = function () {
        
        // dodaj mogucnost filtriranja kroz tabelu
        var filter = function () {
            $('.user-list').filterTable({
                placeholder: 'Filter',
                label: '',
                minRows: 8
            });
        };

        var successCallback = function (response) {
            //console.log(response);
            $scope.ListaAsistenata = response.data;
            $timeout(filter, 500);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        // salje autorizovani GET request
        ApiRequest.authorize("GET", "/Api/Asistenti", "", successCallback, errorCallback);
    };

    // ucitaj asistente
    $scope.GetListAsistenata();

    // na klik idi na formu za azuriranje podataka o asistentu
    $scope.updateUser = function (AsistentID) {
        $location.path('asistenti/' + AsistentID);
    };

    // na klik obrisi asistenta
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

    // na klik dodaj asistenta
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
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$ABCDEFGHIJKLMNOPQRSTUVWXVZ1234567890";
    var length = 10;
    var password = "!1Dp";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        password += chars.charAt(i);
    }
    return password;
}