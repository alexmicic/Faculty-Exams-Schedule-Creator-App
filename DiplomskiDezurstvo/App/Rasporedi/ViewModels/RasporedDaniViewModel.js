// kreiraj raspored Dani controller
rasporediModule.controller("rasporedDaniViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $timeout, ApiRequest) {
    $scope.rasporedID = $routeParams.rasporedID;

    //error message
    $scope.errorMessage = "";
    $scope.addRasporedDanFailed = false;

    //poziv za ucitavanje podataka o rasporedu
    $scope.ListaRasporedDani = {};

    // naslov ispitnog roka
    $scope.RasporedMainNaziv = "";

    // funkcija za ucitavanje svih dana po rasporedu
    $scope.GetRasporedDani = function () {

        // dodaj filtiranje kroz tabelu
        var filter = function () {
            $('table').filterTable({
                placeholder: 'Filter',
                label: '',
                minRows: 8
            });
        };

        var successCallback = function (response) {
            //console.log(response.data);
            $scope.ListaRasporedDani = response.data;
            $scope.RasporedMainNaziv = response.data[0].Rasporedi.Naziv;
            $timeout(filter, 500);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Raspored/" + $scope.rasporedID, "", successCallback, errorCallback);
    };
    // ucitaj sve dane na pageload
    $scope.GetRasporedDani();

    // funkcija za brisanje data, deleteRasporedDan start
    $scope.deleteRasporedDan = function (RasporedDanID) {
        var successCallback = function (response) {
            $scope.GetRasporedDani();
            //console.log(response.data);
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        var data = {
            id: RasporedDanID
        }

        ApiRequest.authorize("DELETE", "/Api/Raspored/" + RasporedDanID, data, successCallback, errorCallback);
    };
    // deleteRasporedDan end

    // funkcija za dodavanje dana, addRaspored start
    // kreiraj prazne objekte u koje ce biti ucitani podaci
    $scope.AddListaSala = {};
    $scope.AddListaPredmeta = {};
    $scope.AddListaAsistenta = {};
    $scope.datum = "";
    // setuj promenljivu koja ce pratiti da li su podaci vec ucitani
    $scope.dataLoaded = false;
    // funkcija za ucitavanje svih asistenata, predmeta i sala
    $scope.loadData = function () {
        if (!$scope.dataLoaded) {
            var successCallbackSale = function (response) {
                // dodaj sale u objekat i inicijalizuj select2 jQuery plugin
                $scope.AddListaSala = response.data;
                $('#AddListaSala').select2({
                    placeholder: "Sala",
                    allowClear: false
                });
            };

            var errorCallbackSale = function (response) {
                //console.log(response);
            };

            ApiRequest.authorize("GET", "/Api/Sale", "", successCallbackSale, errorCallbackSale);

            var successCallbackPredmeti = function (response) {
                /// dodaj predmete u objekat i inicijalizuj select2 jQuery plugin
                $scope.AddListaPredmeta = response.data;
                $('#AddListaPredmeta').select2({
                    placeholder: "Predmeti",
                    allowClear: false
                });
            };

            var errorCallbackPredmeti = function (response) {
                //console.log(response);
            };

            ApiRequest.authorize("GET", "/Api/Predmeti", "", successCallbackPredmeti, errorCallbackPredmeti);

            var successCallbackAsistenti = function (response) {
                // dodaj asistente u objekat i inicijalizuj select2 jQuery plugin
                $scope.AddListaAsistenta = response.data;
                $('#AddListaAsistenta').select2({
                    placeholder: "Asistenti",
                    allowClear: false
                });
            };

            var errorCallbackAsistenti = function (response) {
                //console.log(response);
            };

            ApiRequest.authorize("GET", "/Api/Asistenti", "", successCallbackAsistenti, errorCallbackAsistenti);

            // inicijalizuj datepicker
            var startDate = new Date();
            startDate.setDate(startDate.getDate());
            $('#datepicker').datepicker({
                todayBtn: true,
                todayHighlight: true,
                autoclose: true,
                startDate: startDate,
                orientation: 'top left'
            });

            // setuj promenljivu za pracenje ucitavanja na true, tako da sledeci put ne ucitavamo sve iz pocetka
            $scope.dataLoaded = true;
        }
    };

    // na klik ucitaj sve potrebne podatke i prikazi modal box
    $scope.addRasporedDan = function () {
        $scope.addRasporedDanFailed = false;
        getRasporedData._clear();
        $('#datepicker').val(null);
        $scope.loadData();
    };

    // na klik dodaj novi raspored za dan
    $scope.addRasporedDanSubmit = function () {

        var successCallback = function (response) {
            // resetuj vrednosti
            getRasporedData._clear();
            $('#datepicker').val(null);
            $('#addRasporedDan').modal('hide');
            $scope.GetRasporedDani();
        };

        var errorCallback = function (response) {
            // prikazu poruku ukoliko je doslo do greske
            $scope.addRasporedDanFailed = true;
            $scope.errorMessage = response.data.Message;
        };

        // sacuvaj izbarani datum
        var IzborDatuma = $('#datepicker').val();

        // kreiraj objekat za dodavanje
        var data = {
            "RasporedAsistenti": getRasporedData._asistenti(),
            "RasporedPredmeti": getRasporedData._predmeti(),
            "RasporedSale": getRasporedData._sale(),
            "RasporedMainID": $routeParams.rasporedID,
            "Datum": IzborDatuma
        };

        // post objekat
        ApiRequest.authorize("POST", "/Api/Raspored", data, successCallback, errorCallback);
    };
    // addRaspored end 

    // na klik prikazi formu za azruiranje rasporeda za dan, updateRasporedDan start
    $scope.updateRasporedDan = function (RasporedDanID) {
        $location.path('/rasporedi/dan/' + $scope.rasporedID + '/edit/' + RasporedDanID);
    };
    // updateRasporedDan end

    // na klik, vrati se nazad
    $scope.goBack = function () {
        $location.path('rasporedi/');
    };
});

// pomocne funkcije za prebacivanje selektovanih vrednosti iz select2 objekata u odgovarajuce nizove
var getRasporedData = {
    _asistenti: function () {
        var arrayAsisteti = $('#AddListaAsistenta').val();
        var objectArrayAsistenti = [];
        $.each(arrayAsisteti, function (index, value) {
            var objectAsistent = {
                "AsistentID": value
            };
            objectArrayAsistenti.push(objectAsistent);
        });

        return objectArrayAsistenti;
    },

    _sale: function () {
        var arraySale = $('#AddListaSala').val();
        var objectArraySale = [];
        $.each(arraySale, function (index, value) {
            var objectSala = {
                "SalaID": value
            };
            objectArraySale.push(objectSala);
        });

        return objectArraySale;
    },

    _predmeti: function () {
        var arrayPredmeti = $('#AddListaPredmeta').val();
        var objectArrayPredmeti = [];
        $.each(arrayPredmeti, function (index, value) {
            var objectPredmet = {
                "PredmetID": value
            };
            objectArrayPredmeti.push(objectPredmet);
        });

        return objectArrayPredmeti;
    },

    _clear: function (){
        $('#AddListaPredmeta').val(null).trigger("change");
        $('#AddListaSala').val(null).trigger("change");
        $('#AddListaAsistenta').val(null).trigger("change");
    }
};
