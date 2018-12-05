angular.module('app.routes', [])
  .config(function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      .state('easyMed', {
        url: '/easymed',
        templateUrl: 'templates/easyMed.html',
        controller: 'easyMedCtrl'
      })

      .state('loginPaciente', {
        url: '/patientLogin',
        templateUrl: 'templates/loginPaciente.html',
        controller: 'loginPacienteCtrl'
      })

      .state('loginMedico', {
        url: '/patientMedico',
        templateUrl: 'templates/loginMedico.html',
        controller: 'loginMedicoCtrl'
      })

      .state('cadastroDePaciente', {
        url: '/patientRegister',
        templateUrl: 'templates/cadastroDePaciente.html',
        controller: 'cadastroDePacienteCtrl'
      })

      .state('cadastroDeMedico', {
        url: '/medicRegister',
        templateUrl: 'templates/cadastroDeMedico.html',
        controller: 'cadastroDeMedicoCtrl'
      })

      .state('telaInicialPaciente', {
        url: '/patientMainPage',
        templateUrl: 'templates/telaInicialPaciente.html',
        controller: 'telaInicialPacienteCtrl'
      })

      .state('telaInicialMedico', {
        url: '/medicMainPage',
        templateUrl: 'templates/telaInicialMedico.html',
        controller: 'telaInicialMedicoCtrl'
      })

      .state('configurarAgenda', {
        url: '/configurarAgenda',
        templateUrl: 'templates/configurarAgenda.html',
        controller: 'configurarAgendaCtrl'
      })

      .state('agendaPadrao', {
        url: '/agendaPadrao',
        templateUrl: 'templates/agendaPadrao.html',
        controller: 'agendaPadraoCtrl'
      })

      .state('agendaDiaria', {
        url: '/agendaDiaria',
        templateUrl: 'templates/agendaDiaria.html',
        controller: 'agendaDiariaCtrl'
      })

      .state('horarioParcialDiario', {
        url: '/horarioParcialDiario',
        templateUrl: 'templates/horarioParcialDiario.html',
        controller: 'horarioParcialDiarioCtrl'
      })

      .state('horarioParcialPadrao', {
        url: '/horarioParcialPadrao',
        templateUrl: 'templates/horarioParcialPadrao.html',
        controller: 'horarioParcialPadraoCtrl'
      })

      .state('marcarConsulta01', {
        url: '/marcarConsulta01',
        templateUrl: 'templates/marcarConsulta01.html',
        controller: 'marcarConsulta01Ctrl'
      })

      .state('marcarConsulta02', {
        url: '/marcarConsulta02',
        templateUrl: 'templates/marcarConsulta02.html',
        controller: 'marcarConsulta02Ctrl'
      })

      .state('marcarConsulta03', {
        url: '/marcarConsulta03',
        cache: false,
        templateUrl: 'templates/marcarConsulta03.html',
        controller: 'marcarConsulta03Ctrl'
      })

      .state('consultasPaciente', {
        url: '/consultasPaciente',
        templateUrl: 'templates/consultasPaciente.html',
        controller: 'consultasPacienteCtrl'
      })

      .state('consultasPacienteDetalhe', {
        url: '/consultasPacienteDetalhe',
        templateUrl: 'templates/consultasPacienteDetalhe.html',
        controller: 'consultasPacienteDetalheCtrl'
      })

      .state('consultasMedico', {
        url: '/consultasMedico',
        templateUrl: 'templates/consultasMedico.html',
        controller: 'consultasMedicoCtrl'
      })

      .state('consultasMedicoDetalhe01', {
        url: '/consultasMedicoDetalhe01',
        templateUrl: 'templates/consultasMedicoDetalhe01.html',
        controller: 'consultasMedicoDetalhe01Ctrl'
      })

      .state('consultasMedicoDetalhe02', {
        url: '/consultasMedicoDetalhe02',
        templateUrl: 'templates/consultasMedicoDetalhe02.html',
        controller: 'consultasMedicoDetalhe02Ctrl'
      })

    $urlRouterProvider.otherwise('/easymed')

  });