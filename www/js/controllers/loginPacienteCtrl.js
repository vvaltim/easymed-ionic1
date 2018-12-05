angular.module('app.controllers')
    .controller('loginPacienteCtrl', function ($scope, $state, MobileFactory, $ionicPopup, $ionicLoading, $ionicHistory) {
        $scope.paciente = [];
        var paciente = JSON.parse(window.localStorage.getItem("paciente")); //converte em javascript object
        if (paciente != null) {
            exibirLoading();
            MobileFactory.loginAutomaticoPaciente(paciente.email, paciente.senha).then(function (data) {
                $ionicLoading.hide();
                console.log(data);
                if (data.data.response != "Login e senha incorretos") {
                    //limpar cache e desativar o back-button
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({ disableBack: true });

                    $state.go('telaInicialPaciente');
                }
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
            });
        }

        $scope.login = function (pacienteLogin) {
            exibirLoading();
            MobileFactory.loginPaciente(pacienteLogin.email, pacienteLogin.senha).then(function (data) {
                $ionicLoading.hide();
                console.log(data);
                if (data.data.response != "Login e senha incorretos") {
                    //limpar cache e desativar o back-button
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({ disableBack: true });

                    //salvando o paciente no celular
                    window.localStorage.setItem("paciente", JSON.stringify(data.data));
                    $state.go('telaInicialPaciente');
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