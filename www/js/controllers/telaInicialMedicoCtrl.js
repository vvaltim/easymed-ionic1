angular.module('app.controllers')
    .controller('telaInicialMedicoCtrl', function ($scope, $http, $state) {
        $scope.medico = JSON.parse(window.localStorage.getItem("medico"));
        console.log($scope.medico);

        $scope.logout = function () {
            window.localStorage.removeItem("medico");
            $state.go('easyMed');
        }
    });