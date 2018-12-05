angular.module('app.services')
    .service('AgendarConsultaService', function(){
        //variavel para consulta
        var consulta = [];

        //variavel da especialidade
        var especialidade = [];

        //variavel para armazenar o médico
        var medico = [];

        return{
            getConsulta: function(){
                return consulta;
            },
            setConsulta: function(novaConsulta){
                //console.log(novoHorario);
                consulta = novaConsulta;
            },
            getEspecialidade: function(){
                return especialidade;
            },
            setEspecialidade: function(novaEspecialidade){
                especialidade = novaEspecialidade;
            },
            getMedico: function(){
                return medico;
            },
            setMedico: function(novoMedico){
                medico = novoMedico;
            }
        }
    });