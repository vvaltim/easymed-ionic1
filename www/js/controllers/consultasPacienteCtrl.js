angular.module('app.controllers')
    .controller('consultasPacienteCtrl', function ($scope, $state, $ionicLoading,AgendarConsultaService, MobileFactory) {
        console.log("Controller consultasPaciente");
        var paciente = JSON.parse(window.localStorage.getItem("paciente"));
        //variaveis básicas
        $scope.consultas = [];

        $scope.$on('$ionicView.enter', function () {
            mostrarConsultas();
        });

        $scope.next = function(consulta){
            AgendarConsultaService.setConsulta(consulta);
            $state.go('consultasPacienteDetalhe');
        }

        //função para puxar as consultas do paciente
        function mostrarConsultas(){
            exibirLoading();
            MobileFactory.buscarConsultasPorIdPaciente(paciente.id).then(function(data){
                $ionicLoading.hide();
                console.log(data.data);
                $scope.consultas = data.data;
            }, function(error){
                $ionicLoading.hide();
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