angular.module('app.services')
    .service('ConfiguracaoParcialService', function(){
        //{"days": {"seg","ter","qua","qui","sex","sab"}, "ignore_hours":{"8:00","8:15","9:00"}.
        //variavel para criar os horarios ignorados
        var horarioIgnorado = [];

        //variavel para criar os dias ignorados
        var diaIgnorado = [];

        //2 horas iniciais, 2 horas finais e intervalo
        var intervalo = [];

        return{
            getHorarioIgnorado: function(){
                return horarioIgnorado;
            },
            setHorarioIgnorado: function(novoHorario){
                //console.log(novoHorario);
                horarioIgnorado = novoHorario;
            },
            deleteHorarioIgnorado: function(){
                //console.log(novoHorario);
                horarioIgnorado = [];
            },
            getDiaIgnorado: function(){
                return diaIgnorado;
            },
            setDiaIgnorado: function(novoDia){
                diaIgnorado = novoDia;
            },
            deleteDiaIgnorado: function(){
                diaIgnorado = [];
            },
            getIntervalo: function(){
                return intervalo;
            },
            setIntervalo: function(a1, a2, b1, b2, i){
                intervalo = {
                    'amHoraInicial': a1,
                    'amHoraFinal': a2,
                    'pmHoraInicial': b1,
                    'pmHoraFinal': b2,
                    'intervalo': i
                }
            },
            deleteIntervalo: function(){
                intervalo = [];
            }
        }
    });