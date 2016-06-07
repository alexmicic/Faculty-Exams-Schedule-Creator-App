// login check module
var loginCheck = angular.module('loginCheck', []);

// logicka provera postojanja Tokena
loginCheck.factory('$logincheck', function () {
    if (sessionStorage.getItem('tokenKey') !== null) {
        return true;
    } else {
        return false;
    }
});

loginCheck.service('ApiRequest', function ($http, $logincheck) {
    this.authorize = function (method, url, data, successCallback, errorCallback) {
        if ($logincheck) {
            $http({
                method: method,
                url: url,
                data: data,
                headers: { "Authorization": "Bearer " + sessionStorage.getItem('tokenKey') }
            }).then(successCallback, errorCallback);
        }
    }
});

// main app module
var mainModule = angular.module('main', ['ngRoute', 'loginCheck']);

// glavni controller
mainModule.controller("indexViewModel", function ($scope, $http, $q, $routeParams, $window, $location) {
    
});

// logout controller
mainModule.controller("logoutViewModel", function ($scope, $http, $q, $routeParams, $window, $location, $logincheck, ApiRequest) {

    var logoutCallback = function (response) {
        if (response.status == 200) {
            $scope.message = '';
            sessionStorage.removeItem('tokenKey');
            $window.location.href = '/';
        } else {
            $scope.message = 'Dogodila se greska prilikom odjave. Molimo pokusajte ponovo.'
        }
    };

    $scope.userLogout = function () {
        ApiRequest.authorize("POST", "/Api/Account/Logout", "", logoutCallback, logoutCallback);
    }
});

mainModule.directive('tooltip', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).hover(function () {
                // on mouseenter
                $(element).tooltip('show');
            }, function () {
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});