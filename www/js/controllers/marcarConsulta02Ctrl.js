angular.module('app.controllers')
    .controller('marcarConsulta02Ctrl', function ($scope, $http, $state, $ionicLoading, $ionicPopup, MobileFactory, AgendarConsultaService) {
        //var paciente = JSON.parse(window.localStorage.getItem("paciente"));
        $scope.medicos = [];
        $scope.$on('$ionicView.enter', function () {
            exibirLoading();
            var especialidade = AgendarConsultaService.getEspecialidade();
            MobileFactory.getMedicoPorEspecializacao(especialidade.id).then(function (data) {
                $ionicLoading.hide();
                if (data.data == 'Não há médicos com essa especialização cadastrados.') {
                    $ionicPopup.alert({
                        title: 'Atenção',
                        template: 'Não há medico cadastrado para essa especialização.',
                        okType: 'button-energized'
                    });
                    $state.go('marcarConsulta01');
                } else {
                    $scope.medicos = data.data;
                }
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Não foi possível realizar sua requisição. Tente novamente mais tarde.',
                    okType: 'button-assertive'
                });
            });

        });

        //função para pegar a especialidade apertada
        $scope.next = function (medico) {
            console.log(medico);
            AgendarConsultaService.setMedico(medico);
            $state.go('marcarConsulta03');
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