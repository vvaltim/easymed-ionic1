angular.module('app.controllers')
    .controller('consultasMedicoDetalhe01Ctrl', function ($scope, $state, $ionicLoading, $ionicPopup, MobileFactory, AgendarConsultaService) {
        console.log("Controller consultasMedicoDetalhe01");
        var paciente = JSON.parse(window.localStorage.getItem("paciente"));
        //variaveis básicas
        $scope.consulta = [];
        $scope.status = "";
        $scope.verificarObservacao = false;
        $scope.observacao;

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

        $scope.enviarObservacao = function () {
            $state.go('consultasMedicoDetalhe02');
        }


        $scope.confirmar = function () {
            exibirLoading();
            console.log($scope.consulta.idConsulta);
            MobileFactory.confirmarConsulta($scope.consulta.idConsulta).then(function (data) {
                $ionicLoading.hide();
                console.log(data);
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