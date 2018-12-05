angular.module('app.controllers')
    .controller('marcarConsulta01Ctrl', function ($scope, $http, $state, $ionicLoading, MobileFactory, AgendarConsultaService) {
        //var paciente = JSON.parse(window.localStorage.getItem("paciente"));
        $scope.$on('$ionicView.enter', function () {
            exibirLoading();
            //preenchendo o combo de entidades
            MobileFactory.getTodasEspecialidades().then(function (data) {
                $scope.especialidades = data;
                $ionicLoading.hide();
            }, function (erro) {
                console.log(erro);
                $ionicLoading.hide();
            });
        });

        //função para pegar a especialidade apertada
        $scope.next = function (especialidade) {
            console.log(especialidade.id);
            AgendarConsultaService.setEspecialidade(especialidade);
            $state.go('marcarConsulta02');
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