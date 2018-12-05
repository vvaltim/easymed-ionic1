angular.module('app.controllers')
    .controller('consultasPacienteDetalheCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $ionicHistory, MobileFactory, AgendarConsultaService) {
        console.log("Controller consultasPacienteDetalhe");
        var paciente = JSON.parse(window.localStorage.getItem("paciente"));
        //variaveis básicas
        $scope.consulta = [];
        $scope.status = "";
        $scope.verificarObservacao = false;

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
            if ($scope.consulta.observacao == null) {
                $scope.verificarObservacao = false;
            } else {
                $scope.verificarObservacao = true;
            }
        });

        $scope.cancelarConsulta = function (idConsulta) {
            exibirLoading();
            console.log(idConsulta);
            MobileFactory.cancelarConsulta(idConsulta).then(function (data) {
                $ionicLoading.hide();
                console.log(data);
                //limpar cache e desativar o back-button
                $ionicHistory.clearCache();
                $ionicHistory.nextViewOptions({ disableBack: true });
                $state.go('consultasPaciente');
            }, function (error) {
                $ionicLoading.hide();
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erro!',
                    template: 'Não foi possível enviar a observação, tente novamente mais tarde.',
                    okType: 'button-assertive'
                });
                //limpar cache e desativar o back-button
                $ionicHistory.clearCache();
                $ionicHistory.nextViewOptions({ disableBack: true });
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