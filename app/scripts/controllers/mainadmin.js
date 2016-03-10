'use strict';

/**
 * @ngdoc function
 * @name dmInscricoesApp.controller:MainadminCtrl
 * @description
 * # MainadminCtrl
 * Controller of the dmInscricoesApp
 */
angular.module('dmInscricoesApp')
  .controller('MainadminCtrl', ['$scope', 'AuthService', 'InscricaoService', 'growl', function ($scope, AuthService, InscricaoService, growl) {
    AuthService.isLoggedIn();
    $scope.usuarioLogado = AuthService.usuarioLogado;
    $scope.inscricoes = [];
    $scope.inscricoesAux = [];
    function init(){
      InscricaoService.getInscricoes().then(function(retorno){
        $scope.inscricoes = retorno.data.data;
        $scope.inscricoesAux = $scope.inscricoes;
      }).catch(function(err){
        console.error(err);
      });
    };
    init();

    $scope.confirmar = function(inscricao){
      inscricao.status = 'INSCRIÇÃO CONFIRMADA';
      InscricaoService.confirmarInscricao(inscricao).then(function(retorno){
        init();
        var insc = retorno.data[0];
        InscricaoService.sendMailConfirmation(insc.nome, window.btoa(insc.id), insc.email).then(function(){
          console.log('email enviado');
          growl.success('Inscrição confirmada', {ttl: 4000});
        }).catch(function(err){
          growl.error(err);
          console.error(err);
        });
      }).catch(function(err){
        console.error(err);
      });
    };

    $scope.logout = function(){
      AuthService.logout();
    };
  }]);
