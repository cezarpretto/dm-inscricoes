'use strict';

/**
 * @ngdoc function
 * @name dmInscricoesApp.controller:InscricaoCtrl
 * @description
 * # InscricaoCtrl
 * Controller of the dmInscricoesApp
 */
angular.module('dmInscricoesApp')
  .controller('InscricaoCtrl', ['$scope', 'InscricaoModel', '$routeParams', 'InscricaoService', 'ModalService', '$sce', function ($scope, InscricaoModel, $routeParams, InscricaoService, ModalService, $sce) {
    // console.log(window.atob($routeParams.id_inscricao));
    $scope.idInscricao = $routeParams.id_inscricao;
    $scope.inscricao = new InscricaoModel.Inscricao();
    $scope.retornoSucesso = false;
    $scope.comprovanteOk = false;
    $scope.update = false;
    $scope.comprovante = {comprovanteBase64: undefined};

    if($scope.idInscricao !== undefined){
      $scope.update = true;
      InscricaoService.get(window.atob($scope.idInscricao)).then(function(retorno){
        $scope.inscricao = retorno.data.data[0];
      }).catch(function(err){
        console.error(err);
      });
    }

    $scope.salvar = function(){
      var retorno = [];
      // console.log($scope.inscricao);
      $scope.inscricao.status = 'INSCRIÇÃO REALIZADA';
      ModalService.show('loadingInscricao');
      InscricaoService.post($scope.inscricao).then(function(data){
        retorno = data.data.data[0];
        $scope.retornoSucesso = retorno
        $scope.inscricao = new InscricaoModel.Inscricao();
        InscricaoService.sendMail(retorno.nome, window.btoa(retorno.id), retorno.email).then(function(data){
          ModalService.hide('loadingInscricao');
        }).catch(function(err){
          $scope.retornoSucesso = false;
          console.error(err);
        });
      }).catch(function(err){
        console.error(err);
        $scope.retornoSucesso = false;
      });
    };

    $scope.atualizar = function(){
      $scope.inscricao.status = 'COMPROVANTE ENVIADO';
      ModalService.show('loadingInscricao');
      InscricaoService.put($scope.inscricao).then(function(retorno){
        ModalService.hide('loadingInscricao');
        $scope.inscricao = new InscricaoModel.Inscricao();
        $scope.comprovanteOk = retorno.data[0];
      }).catch(function(err){
        ModalService.hide('loadingInscricao');
        $scope.comprovanteOk = false;
        console.error(err);
      })
    };

    $scope.sendMail = function(){
      InscricaoService.sendMail('Cezar Pretto', '0000', 'cezar_pretto6@hotmail.com').then(function(data){
        console.log(data);
      }).catch(function(err){
        console.error(err);
      });
    };

    $scope.$watch('comprovante.comprovanteBase64', function(newValue){
      if(newValue !== undefined){
        $scope.inscricao.comprovante = 'data:application/pdf;base64,' + newValue.base64;
        $scope.atualizar();
      }
    });

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.openFile = function(arg){
      $('#inputFile').click();
    };
  }]);
