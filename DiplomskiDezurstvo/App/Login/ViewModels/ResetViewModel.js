// reset controller
loginModule.controller('resetViewModel', function ($scope, $http, $q, $routeParams, $window, $location, $logincheck, $timeout,
    ApiRequest) {

    $scope.message = '';
    $scope.success = false;
    $scope.error = false;

    $scope.password = "";

    var redirect = function () {
        $location.path('/login');
    };

    $scope.userReset = function () {

        var successCallback = function (response) {
            //console.log(response.data);
            $scope.success = true;
            $scope.error = false;
            $timeout(redirect, 3000);
        };

        var errorCallback = function (response) {
            //console.log(response.data);
            $scope.success = false;
            $scope.error = true;
        };

        var data = {
            NewPassword: $scope.password,
            token: $routeParams.code,
            userId: $routeParams.userId
        }

        $http({
            method: "POST",
            url: "/Api/Account/ResetPassword",
            data: data
        }).then(successCallback, errorCallback);
    };
});