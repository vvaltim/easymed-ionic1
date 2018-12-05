angular.module('app.controllers')
    .controller('loginMedicoCtrl', function ($scope, $http, $state, MobileFactory, $ionicPopup, $ionicLoading, $ionicHistory) {
        $scope.medico = [];
        var medico = JSON.parse(window.localStorage.getItem("medico"));
        if (medico != null) {
            exibirLoading();
            MobileFactory.loginAutomaticoMedico(medico.email, medico.senha).then(function (data) {
                console.log(data);
                window.localStorage.setItem("medico", JSON.stringify(data.data));
                $ionicLoading.hide();
                if (data.data.response != "Login e senha incorretos") {
                    //limpar cache e desativar o back-button
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({ disableBack: true });

                    $state.go('telaInicialMedico');
                }
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
            });
        }

        $scope.login = function (medico) {
            exibirLoading();
            MobileFactory.loginMedico(medico.email, medico.senha).then(function (data) {
                console.log(data);
                $ionicLoading.hide();

                if (data.data.response != "Login e senha incorretos") {
                    //limpar cache e desativar o back-button
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({ disableBack: true });

                    //salvando o paciente no celular
                    window.localStorage.setItem("medico", JSON.stringify(data.data));
                    $state.go('telaInicialMedico');
                } else {
                    $scope.paciente.senha = "";
                    $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Não foi possível efetuar login, email ou senha incorretos.',
                        okType: 'button-assertive'
                    });
                }
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Não foi possível se conectar ao servidor, tente novamente mais tarde.',
                    okType: 'button-assertive'
                });
            });
        }
        function exibirLoading() {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        }
    });