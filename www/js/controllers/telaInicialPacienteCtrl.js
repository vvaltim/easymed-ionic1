angular.module('app.controllers')
    .controller('telaInicialPacienteCtrl', function ($scope, $state, $ionicHistory) {
        $scope.paciente = JSON.parse(window.localStorage.getItem("paciente"));

        $scope.logout = function () {
            window.localStorage.removeItem("paciente");
            //limpar cache e desativar o back-button
            $ionicHistory.clearCache();
            $ionicHistory.nextViewOptions({ disableBack: true });
            $state.go('easyMed');
        }
    });