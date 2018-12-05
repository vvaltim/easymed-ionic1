angular.module('app.controllers')
    .controller('easyMedCtrl', function ($scope, $http, $state, MobileFactory) {
        $scope.ipAtual = '';
        $scope.$on('$ionicView.enter', function () {
            $scope.ipAtual = MobileFactory.getIp();
        });

        $scope.setarIp = function(novoIp){
            MobileFactory.setIp(novoIp);
            $scope.ipAtual = MobileFactory.getIp();
            novoIP = '';
        }
    });