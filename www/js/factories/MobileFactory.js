angular.module('app.factories')
    .factory('MobileFactory', function ($http, $q) {
        //colocar ip servidor aqui
        //var url = 'http://192.168.0.102:8080/EasyMedWS/rest/';
        var url = window.localStorage.getItem("ipService");
        return {
            setIp: function(ip){
                url = 'http://' + ip + ':8080/EasyMedWS/rest/';
                window.localStorage.setItem("ipService", url);
            },
            getIp: function(){
                return url;
            },
            getTodasEspecialidades: function () {   //pega todas as especialidades
                var deferred = $q.defer();
                $http.get(url + 'medico/listarTodasEspecialidades')
                    .success(deferred.resolve)
                    .error(deferred.resolve);
                return deferred.promise;
            },
            saveMedico: function (medico) {   //pega todas as especialidades
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'medico/salvar',
                    data: medico,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            loginMedico: function (email, senha) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'medico/login',
                    data: {
                        'email': email,
                        'senha': senha
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            loginAutomaticoMedico: function (email, senha) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'medico/loginAutomatico',
                    data: {
                        'email': email,
                        'senha': senha
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            salvarAgenda: function (agenda) {
                var deferred = $q.defer();
                console.log(agenda);
                //convertendo o objeto pra string, pro gson conseguir converter no back
                var confTemp = JSON.stringify(agenda.configuracao_detalhada);
                return $http({
                    method: 'POST',
                    url: url + 'medico/salvaragendapadrao',
                    data: {
                        'amHoraInicial': agenda.amHoraInicial,
                        'amHoraFinal': agenda.amHoraFinal,
                        'pmHoraInicial': agenda.pmHoraInicial,
                        'pmHoraFinal': agenda.pmHoraFinal,
                        'intervalo': agenda.intervalo,
                        'idMedico': agenda.id_medico,
                        'configuracaoDetalhada': confTemp
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            salvarAgendaDiaria: function (agenda) {
                var deferred = $q.defer();
                console.log(agenda);
                //convertendo o objeto pra string, pro gson conseguir converter no back
                var confTemp = JSON.stringify(agenda.configuracao_detalhada);
                return $http({
                    method: 'POST',
                    url: url + 'medico/salvaragendadiaria',
                    data: {
                        'amHoraInicial': agenda.amHoraInicial,
                        'amHoraFinal': agenda.amHoraFinal,
                        'pmHoraInicial': agenda.pmHoraInicial,
                        'pmHoraFinal': agenda.pmHoraFinal,
                        'intervalo': agenda.intervalo,
                        'idMedico': agenda.id_medico,
                        'data': agenda.data,
                        'configuracaoDetalhada': confTemp
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            savePaciente: function (paciente) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'paciente/cadastro',
                    data: paciente,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            loginPaciente: function (email, senha) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'paciente/login',
                    data: {
                        'email': email,
                        'senha': senha
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            loginAutomaticoPaciente: function (email, senha) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'paciente/loginAutomatico',
                    data: {
                        'email': email,
                        'senha': senha
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getMedicoPorEspecializacao: function (especializacao) {
                var deferred = $q.defer();
                return $http({
                    method: 'GET',
                    url: url + 'medico/especializacao/' + especializacao,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getHorarioPorIDMedicoEData: function (idMedico, data) {
                var deferred = $q.defer();
                return $http({
                    method: 'GET',
                    url: url + 'medico/horario/' + idMedico + '/' + data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            },
            agendarConsulta: function (consulta) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'paciente/agendarConsulta',
                    data: {
                        'idPaciente': consulta.idPaciente,
                        'idMedica': consulta.idMedico,
                        'idStatus': consulta.idStatus,
                        'data': consulta.data,
                        'hora': consulta.hora,
                        'convenio': consulta.convenio
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            getConsultaPorIdPaciente: function (idMedico, data) {
                var deferred = $q.defer();
                return $http({
                    method: 'GET',
                    url: url + 'medico/horario/' + idMedico + '/' + data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            buscarConsultasPorIdPaciente: function (idPaciente) {
                var deferred = $q.defer();
                return $http({
                    method: 'GET',
                    url: url + 'paciente/listarConsultasPaciente/' + idPaciente,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            buscarConsultasPorIdMedico: function (idMedico) {
                var deferred = $q.defer();
                return $http({
                    method: 'GET',
                    url: url + 'medico/listarConsultasMedico/' + idMedico,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            confirmarConsulta: function (idConsulta) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'medico/confirmarConsulta/',
                    data: {
                        'idConsulta': idConsulta
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            confirmarConsultaObservacao: function (idConsulta, observacao) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'medico/confirmarConsultaComObservacao/',
                    data: {
                        'idConsulta': idConsulta,
                        'observacao': observacao
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            cancelarConsulta: function (idConsulta) {
                var deferred = $q.defer();
                return $http({
                    method: 'POST',
                    url: url + 'paciente/cancelarconsulta/',
                    data: {
                        'idConsulta': idConsulta
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }
    });