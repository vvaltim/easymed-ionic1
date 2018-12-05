angular.module('app.controllers')
    .controller('consultasMedicoDetalhe02Ctrl', function ($scope, $state, $ionicLoading, $ionicPopup, MobileFactory, AgendarConsultaService) {
        console.log("Controller consultasMedicoDetalhe02");
        var medico = JSON.parse(window.localStorage.getItem("medico"));
        //variaveis básicas
        $scope.consulta = [];
        $scope.status = "";
        $scope.observacao;

        //função quando entra na view
        $scope.$on('$ionicView.enter', function () {
            $scope.consulta = AgendarConsultaService.getConsulta();
            console.log($scope.consulta);
            if ($scope.consulta.idStatus == 1) {
                $scope.status = "Não confirmada";
            } else if ($scope.consulta.idStatus == 2) {
                $scope.status = "Confirmada";
            } else {
                $scope.status = "Cancelada"
            }
        });

        $scope.enviar = function (observacao) {
            exibirLoading();
            console.log(observacao);
            MobileFactory.confirmarConsultaObservacao(medico.id, observacao).then(function (data) {
                $ionicLoading.hide();
                console.log(data);
                $scope.consulta.observacao = observacao;
                AgendarConsultaService.setConsulta($scope.consulta.observacao);
                $state.go('consultasMedico');
            }, function (error) {
                $ionicLoading.hide();
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Não foi possível enviar a observação, tente novamente mais tarde.',
                    okType: 'button-assertive'
                });
            });
        }

        //função de inicializar o carregando
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