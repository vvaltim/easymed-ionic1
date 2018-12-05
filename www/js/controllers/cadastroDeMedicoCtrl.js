angular.module('app.controllers')
    .controller('cadastroDeMedicoCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $ionicHistory, MobileFactory) {
        exibirLoading();
        $scope.especialidades = [];

        $scope.$on('$ionicView.enter', function () {
            //preenchendo o combo de entidades
            MobileFactory.getTodasEspecialidades().then(function (data) {
                console.log(data);
                $scope.especialidades = data;
                $ionicLoading.hide();
            }, function (erro) {
                console.log(erro);
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Não foi possível obter as especialidades, tente novamente mais tarde.',
                    okType: 'button-assertive'
                });
            });
        });

        $scope.salvar = function (medico) {
            exibirLoading();
            MobileFactory.saveMedico(medico).then(function (data) {
                MobileFactory.loginMedico(medico.email, medico.senha).then(function (data) {
                    console.log(data);
                    $ionicLoading.hide();
                    if (data.data.response != "Login e senha incorretos") {
                        //limpar cache e desativar o back-button
                        $ionicHistory.clearCache();
                        $ionicHistory.nextViewOptions({ disableBack: true });

                        window.localStorage.setItem("medico", JSON.stringify(data.data));
                        $state.go('telaInicialMedico');
                    }
                }, function (error) {
                    console.log(error);
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Não foi possível efetuar login, tente novamente mais tarde.',
                        okType: 'button-assertive'
                    });
                    $state.go('loginMedico');
                });
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
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