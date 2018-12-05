angular.module('app.controllers')
    .controller('cadastroDePacienteCtrl', function ($scope, $state, $ionicLoading, $ionicHistory, MobileFactory) {
        $scope.salvar = function (paciente) {
            exibirLoading();
            console.log(paciente);
            MobileFactory.savePaciente(paciente).then(function (data) {
                MobileFactory.loginPaciente(paciente.email, paciente.senha).then(function (data) {
                    console.log(data);
                    window.localStorage.setItem("paciente", JSON.stringify(data.data));
                    //limpar cache e desativar o back-button
                    $ionicHistory.clearCache();
                    $ionicHistory.nextViewOptions({disableBack: true});
                    $ionicLoading.hide();
                    $state.go('telaInicialPaciente');
                }, function (error) {
                    console.log(error);
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Não foi possível efetuar login, tente novamente mais tarde.',
                        okType: 'button-assertive'
                    });
                    $state.go('loginPaciente');
                });
            }, function (error) {
                $ionicLoading.hide();
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Não foi possível criar conta, tente novamente mais tarde.',
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