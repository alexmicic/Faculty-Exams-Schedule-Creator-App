// raspored edit controller
rasporediModule.controller("rasporedEditViewModel", function ($scope, $filter, $http, $q, $routeParams, $window, $location, ApiRequest) {

    $scope.rasporedID = $routeParams.rasporedID;
    $scope.rasporedDanID = $routeParams.rasporedDanID;

    $scope.rasporedDatum = "";

    $scope.RasporedEditUpdateSucess = false;
    $scope.RasporedEditUpdateFailed = false;

    //poziv za ucitavanje podataka o rasporedu
    //$scope.rasporedEdit = {};

    $scope.GetRasporedEdit = function () {

        var successCallback = function (response) {
            setRasporedData._asistenti(response.data);
            setRasporedData._predmeti(response.data);
            setRasporedData._sale(response.data);
            $('#datepicker').datepicker('setDate', $filter('date')(response.data.Datum, "mm-dd-yyyy"));
            $scope.rasporedDatum = $('#datepicker').val();
            //console.log(response.data);
            //$scope.rasporedEdit = response.data;
        };

        var errorCallback = function (response) {
            //console.log(response);
        };

        ApiRequest.authorize("GET", "/Api/Raspored/?single='single'&singleId=" + $scope.rasporedDanID, "", successCallback, errorCallback);
    };

    //load data
    $scope.loadData = function () {
  
        var successCallbackSale = function (response) {
            //console.log(response.data);
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
            //console.log(response.data);
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
            //console.log(response.data);
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

        //datepicker
        var startDate = new Date();
        startDate.setDate(startDate.getDate());
        $('#datepicker').datepicker({
            todayBtn: true,
            todayHighlight: true,
            autoclose: true,
            startDate: startDate,
            orientation: 'top left'
        });

    };

    //ucitaj sve predmete, asistente, sale pa onda
    $scope.loadData();

    // ucitaj raspored Edit
    $scope.GetRasporedEdit();

    $scope.updateRasporedEdit = function () {
        var successCallback = function (response) {
            //console.log(response.data);
            $('#datepicker').val(null);
            
            //$location.path('rasporedi/dan/' + $scope.rasporedID);
            ApiRequest.authorize("POST", "/Api/Raspored/", dataPost, successCallbackPost, errorCallbackPost);
        };

        var errorCallback = function (response) {
            //console.log(response);
            $scope.RasporedEditUpdateFailed = true;
        };

        var successCallbackPost = function (response) {
            //console.log(response.data);
            $('#datepicker').val(null);

            $location.path('rasporedi/dan/' + $scope.rasporedID);
            $scope.RasporedEditUpdateSucess = true;
        };

        var errorCallbackPost = function (response) {
            //console.log(response);
            $scope.RasporedEditUpdateFailed = true;
        };

        var IzborDatuma = $('#datepicker').val();

        var dataPost = {
            "RasporedAsistenti": getRasporedData._asistenti(),
            "RasporedPredmeti": getRasporedData._predmeti(),
            "RasporedSale": getRasporedData._sale(),
            "RasporedMainID": $routeParams.rasporedID,
            "Datum": IzborDatuma
        };

        var dataDelete = {
            id: $scope.rasporedDanID
        }

        ApiRequest.authorize("DELETE", "/Api/Raspored/" + $scope.rasporedDanID, dataDelete, successCallback, errorCallback);
    };

    $scope.goBack = function () {
        $location.path('rasporedi/dan/' + $scope.rasporedID);
    };
});

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

    _clear: function () {
        $('#AddListaPredmeta').val(null).trigger("change");
        $('#AddListaSala').val(null).trigger("change");
        $('#AddListaAsistenta').val(null).trigger("change");
    }
};

var setRasporedData = {
    _asistenti: function (object) {
        var asistentiArray = [];
        $.each(object.RasporedAsistenti, function () {
            asistentiArray.push(''+ this.AsistentID + '');
        });
        //console.log(asistentiArray);
        $('#AddListaAsistenta').val(asistentiArray).trigger("change");
    },
    
    _sale: function (object) {
        var asistentiArray = [];
        $.each(object.RasporedSale, function () {
            asistentiArray.push('' + this.SalaID + '');
        });
        //console.log(asistentiArray);
        $('#AddListaSala').val(asistentiArray).trigger("change");
    },

    _predmeti: function (object) {
        var asistentiArray = [];
        $.each(object.RasporedPredmeti, function () {
            asistentiArray.push('' + this.PredmetID + '');
        });
        //console.log(asistentiArray);
        $('#AddListaPredmeta').val(asistentiArray).trigger("change");
    }
};

