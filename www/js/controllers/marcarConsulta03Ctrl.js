angular.module('app.controllers')
    .controller('marcarConsulta03Ctrl', function ($scope, $http, $state, $ionicLoading, $ionicPopup, ionicDatePicker, $ionicHistory, MobileFactory, AgendarConsultaService) {
        var paciente = JSON.parse(window.localStorage.getItem("paciente"));
        $scope.consulta = [];
        $scope.horarios = [];
        $scope.medico = [];
        $scope.$on('$ionicView.enter', function () {
            $scope.medico = AgendarConsultaService.getMedico();
            console.log($scope.medico.id);
        });

        //pegando a data que o usuário selecionar
        var varData = {
            callback: function (val) {  //Mandatory
                var converterData = new Date(val);
                var correcaoData = converterData.getMonth() + 1; //javascript pega a data começando por 0
                $scope.consulta.data = converterData.getDate() + '-' + correcaoData + '-' + converterData.getFullYear();
                exibirLoading();
                MobileFactory.getHorarioPorIDMedicoEData($scope.medico.id, $scope.consulta.data).then(function (data) {
                    $ionicLoading.hide();
                    console.log(data.data.data);
                    if (data.data.data == "Não há horario para esse dia.") {
                        $ionicPopup.alert({
                            title: 'Atenção',
                            template: 'O médico não atende nesse dia específico.',
                            okType: 'button-energized'
                        });
                    } else {
                        $ionicLoading.hide();
                        console.log(data.data);
                        $scope.horarios = data.data;
                    }
                }, function (error) {
                    $ionicLoading.hide();
                    console.log(error);
                    $ionicPopup.alert({
                        title: 'Erro',
                        template: 'Não foi possível se conectar ao servidor. Tente novamente mais tarde.',
                        okType: 'button-assertive'
                    });
                });
            },
            from: new Date(), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            templateType: 'popup'       //Optional
        };

        $scope.pesquisarData = function () {
            ionicDatePicker.openDatePicker(varData);
        }

        //função para pegar a especialidade apertada
        $scope.next = function (horario) {
            $scope.consulta.idMedico = $scope.medico.id;
            $scope.consulta.idPaciente = paciente.id
            $scope.consulta.idStatus = 1;
            $scope.consulta.hora = horario;
            console.log($scope.consulta);
            exibirLoading();
            MobileFactory.agendarConsulta($scope.consulta).then(function (data) {
                $ionicLoading.hide();
                console.log(data);
                $ionicPopup.alert({
                    title: 'Sucesso',
                    template: 'A sua solicitação de consulta foi efetuada com sucesso. Você pode acompanhar se seu horario foi confirmado ou não no menu Consultas.',
                    okType: 'button-positive'
                });
                //limpar cache e desativar o back-button
                $ionicHistory.clearCache();
                $ionicHistory.nextViewOptions({ disableBack: true });
                $state.go('telaInicialPaciente');
            }, function (error) {
                $ionicLoading.hide();
                console.log(error);
                $ionicPopup.alert({
                    title: 'Erro',
                    template: 'Não foi possivel agendar sua consulta, tente novamente mais tarde.',
                    okType: 'button-assertive'
                });
                //limpar cache e desativar o back-button
                $ionicHistory.clearCache();
                $ionicHistory.nextViewOptions({ disableBack: true });
                $state.go('telaInicialPaciente');
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