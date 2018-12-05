angular.module('app.controllers')
    .controller('horarioParcialPadraoCtrl', function ($scope, $state, ConfiguracaoParcialService) {
        //pegando todos os horarios em segundos
        var variaveisUteis = ConfiguracaoParcialService.getIntervalo();
        $scope.mostrarHoraAM = [];
        $scope.mostrarHoraPM = [];

        //console.log(variaveisUteis);

        //horas am que serão mostradas      $scope.variaveisUteis.amHoraInicial e $scope.variaveisUteis.amHoraFinal
        for(var i = variaveisUteis.amHoraInicial; i <= variaveisUteis.amHoraFinal; i += variaveisUteis.intervalo){
            var tempData = new Date(i);
            var horaTemp = tempData.getUTCHours();
            var minutoTemp = tempData.getUTCMinutes();
            if(minutoTemp == 0){
                minutoTemp = "00";
            }
            //console.log(horaTemp, ' : ', minutoTemp);
            var am = [];
            am.tempo = horaTemp + ":" + minutoTemp;
            am.valor = true;
            $scope.mostrarHoraAM.push(am);
        }

        //horas pm que serão mostradas
        for(var i = variaveisUteis.pmHoraInicial; i <= variaveisUteis.pmHoraFinal; i += variaveisUteis.intervalo){
            var tempData = new Date(i);
            var horaTemp = tempData.getUTCHours();
            var minutoTemp = tempData.getUTCMinutes();
            if(minutoTemp == 0){
                minutoTemp = "00";
            }
            //console.log(horaTemp, ' : ', minutoTemp);
            var pm = [];
            pm.tempo = horaTemp + ":" + minutoTemp;
            pm.valor = true;
            $scope.mostrarHoraPM.push(pm);
        }

        $scope.salvar = function(ignoradoAM, ignoradoPM){
            //pegando os false para adicionar no ignore_hours
            var ignore_hours = [];
            for(var i = 0; i < ignoradoAM.length; i++){
                if(ignoradoAM[i].valor == false){
                    //console.log($scope.mostrarHoraAM[i].tempo);
                    ignore_hours.push(ignoradoAM[i].tempo);
                }
            }
            for(var i = 0; i < ignoradoPM.length; i++){
                if(ignoradoPM[i].valor == false){
                    //console.log(ignoradoPM[i].tempo);
                    ignore_hours.push(ignoradoPM[i].tempo);
                }
            }
            //console.log(ignore_hours);
            ConfiguracaoParcialService.setHorarioIgnorado(ignore_hours);
            $state.go('agendaPadrao');
        }
        
    });