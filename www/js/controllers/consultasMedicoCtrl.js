angular.module('app.controllers')
    .controller('consultasMedicoCtrl', function ($scope, $state, $ionicLoading,AgendarConsultaService, MobileFactory) {
        console.log("Controller consultasPaciente");
        var medico = JSON.parse(window.localStorage.getItem("medico"));
        //variaveis básicas
        $scope.consultas = [];

        $scope.$on('$ionicView.enter', function () {
            mostrarConsultas();
        });

        $scope.next = function(consulta){
            AgendarConsultaService.setConsulta(consulta);
            $state.go('consultasMedicoDetalhe01');
        }

        //função para puxar as consultas do paciente
        function mostrarConsultas(){
            exibirLoading();
            MobileFactory.buscarConsultasPorIdMedico(medico.id).then(function(data){
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