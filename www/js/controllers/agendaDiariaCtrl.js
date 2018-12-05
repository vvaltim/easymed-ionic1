angular.module('app.controllers')
    .controller('agendaDiariaCtrl', function ($scope, $state, $ionicLoading, $ionicPopup, $ionicHistory, ionicTimePicker, ionicDatePicker, ConfiguracaoParcialService, MobileFactory) {
        $scope.retornoHorarioParcial = ConfiguracaoParcialService.getHorarioIgnorado();
        $scope.$on('$ionicView.enter', function () {
            //toda vez que entrar na view, chamar o getHorarioIgnorado
            $scope.retornoHorarioParcial = ConfiguracaoParcialService.getHorarioIgnorado();
        });
        $scope.agendaPadrao = [];
        var horaEmSegundos = [];

        //pegando a data usando o plugin
        var varData = {
            callback: function (val) {  //Mandatory
                //console.log('Return value from the datepicker popup is : ' + val, new Date(val));
                var converterData = new Date(val);
                var horaCorrigida = converterData.getMonth() + 1;       //javascript começa os meses no 0
                var fullData = converterData.getDate() + '-' + horaCorrigida + '-' + converterData.getFullYear();
                //console.log(fullData);
                $scope.agendaPadrao.data = fullData;
            },
            from: new Date(), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            //closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional
        };

        //pegando a hora A1
        var timeA1 = {
            callback: function (val) {
                if (typeof (val) === 'undefined') {
                    console.log('Hora não selecionada');
                } else {
                    var selectedTime = new Date(val * 1000);
                    //console.log('Selected epoch is: ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    $scope.agendaPadrao.amHoraInicial = selectedTime.getUTCHours();
                    horaEmSegundos.a1 = val * 1000;
                }
            },
            inputTime: 28800,       //quantidade em segundos (8:00H)
            format: 24,
            step: 60,
            setLabel: 'Confirmar',
            closeLabel: 'Cancelar'
        };
        //pegando a hora A2
        var timeA2 = {
            callback: function (val) {
                if (typeof (val) === 'undefined') {
                    console.log('Hora não selecionada');
                } else {
                    var selectedTime = new Date(val * 1000);
                    //console.log('Selected epoch is: ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    $scope.agendaPadrao.amHoraFinal = selectedTime.getUTCHours();
                    horaEmSegundos.a2 = val * 1000;
                }
            },
            inputTime: 39600,       // 11:00H
            format: 24,
            step: 60,
            setLabel: 'Confirmar',
            closeLabel: 'Cancelar'
        };
        //pegando a hora B1
        var timeB1 = {
            callback: function (val) {
                if (typeof (val) === 'undefined') {
                    console.log('Hora não selecionada');
                } else {
                    var selectedTime = new Date(val * 1000);
                    //console.log('Selected epoch is: ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    $scope.agendaPadrao.pmHoraInicial = selectedTime.getUTCHours();
                    horaEmSegundos.b1 = val * 1000;
                }
            },
            inputTime: 46800,       // 13:00
            format: 24,
            step: 60,
            setLabel: 'Confirmar',
            closeLabel: 'Cancelar'
        };
        //pegando a hora B2
        var timeB2 = {
            callback: function (val) {
                if (typeof (val) === 'undefined') {
                    console.log('Hora não selecionada');
                } else {
                    var selectedTime = new Date(val * 1000);
                    //console.log('Selected epoch is: ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
                    $scope.agendaPadrao.pmHoraFinal = selectedTime.getUTCHours();
                    horaEmSegundos.b2 = val * 1000;
                }
            },
            inputTime: 61200,       // 17:00
            format: 24,
            step: 60,
            setLabel: 'Confirmar',
            closeLabel: 'Cancelar'
        };

        /* Definindo o evento para pegar a data específica */
        $scope.definirData = function () {
            ionicDatePicker.openDatePicker(varData);
        }

        /* Definindo o evento para pegar as horas */
        $scope.definirPeriodoA1 = function () {
            var resteRetorno = ionicTimePicker.openTimePicker(timeA1);
        }

        $scope.definirPeriodoA2 = function () {
            var resteRetorno = ionicTimePicker.openTimePicker(timeA2);
        }

        $scope.definirPeriodoB1 = function () {
            var resteRetorno = ionicTimePicker.openTimePicker(timeB1);
        }

        $scope.definirPeriodoB2 = function () {
            var resteRetorno = ionicTimePicker.openTimePicker(timeB2);
        }

        /* Chamando a tela de horario parcial */
        $scope.definirConfiguracaoParcial = function (agenda) {
            //console.log(agenda);
            if ((agenda.amHoraInicial != null && agenda.amHoraFinal != null && agenda.pmHoraInicial != null && agenda.pmHoraFinal != null) && agenda.intervalo != null) {
                //convertendo o intervalo em segundos
                var intervaloTemp = (agenda.intervalo * 60) * 1000;
                //console.log(intervaloTemp);
                ConfiguracaoParcialService.setIntervalo(horaEmSegundos.a1, horaEmSegundos.a2, horaEmSegundos.b1, horaEmSegundos.b2, intervaloTemp);
                $state.go('horarioParcialDiario');
            }
        }

        /* Requisição de salvar no banco */
        $scope.salvar = function (agenda) {
            /* Verificar se todos os campos obrigatórios foram preenchidos */


            agenda.intervalo
            agenda.pmHoraInicial
            agenda.pmHoraFinal
            if (agenda.amHoraInicial == null) {
                //avisando o usuário que deu errado
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: 'E necessário informar a hora inicial do atendimento no périodo da manha para continuar.',
                    okType: 'button-energized'
                });
            } else if (agenda.amHoraFinal == null) {
                //avisando o usuário que deu errado
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: 'E necessário informar a hora final do atendimento no périodo da manha para continuar.',
                    okType: 'button-energized'
                });
            } else if (agenda.data == null) {
                //avisando o usuário que deu errado
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: 'E necessário informar o dia desta configuração diária.',
                    okType: 'button-energized'
                });
            } else if (agenda.intervalo == null) {
                //avisando o usuário que deu errado
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: 'E necessário informar o intervalo entre as consultas.',
                    okType: 'button-energized'
                });
            } else if (agenda.pmHoraInicial == null) {
                //avisando o usuário que deu errado
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: 'E necessário informar a hora inicial do atendimento no périodo da tarde para continuar.',
                    okType: 'button-energized'
                });
            } else if (agenda.pmHoraFinal == null) {
                //avisando o usuário que deu errado
                $ionicPopup.alert({
                    title: 'Atenção!',
                    template: 'E necessário informar a hora final do atendimento no périodo da tarde para continuar.',
                    okType: 'button-energized'
                });
            } else {
                /* Iniciando o carregando */
                exibirLoading();

                /* Pegando o id do médico que esta logado */
                var medicoTemp = JSON.parse(window.localStorage.getItem("medico"));
                agenda.id_medico = medicoTemp.id;

                /* Juntando os dias da semana com as horas ignoradas */
                agenda.configuracao_detalhada = {
                    'days': [],
                    'ignore_hours': $scope.retornoHorarioParcial
                }

                /* Imprimindo os valores */
                console.log(agenda);

                /* Enviando para o WS */
                MobileFactory.salvarAgendaDiaria(agenda).then(function (sucess) {
                    //interrompendo o carregando
                    $ionicLoading.hide();

                    //avisando o usuário que deu certo
                    $ionicPopup.alert({
                        title: 'Sucesso!',
                        template: 'Sua agenda padrão foi configurada com sucesso.',
                        okType: 'button-positive'
                    });

                    //limpando o cache e o historico
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();

                    /* Zerando o service pra evitar problemas futuros */
                    ConfiguracaoParcialService.deleteHorarioIgnorado();
                    ConfiguracaoParcialService.deleteDiaIgnorado();
                    ConfiguracaoParcialService.deleteIntervalo();

                    //voltando pra tela inicial
                    $state.go('telaInicialMedico');
                }, function (error) {
                    //interrompendo o carregando
                    $ionicLoading.hide();

                    //avisando o usuário que deu errado
                    $ionicPopup.alert({
                        title: 'Erro!',
                        template: 'Não foi possível realizar sua requisição. Tente novamente mais tarde.',
                        okType: 'button-assertive'
                    });
                    console.log(error);
                    $state.go('telaInicialMedico');
                });
            }
        }

        /* Função que chama o carregando */
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