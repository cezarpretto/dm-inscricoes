'use strict';

/**
 * @ngdoc function
 * @name dmInscricoesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dmInscricoesApp
 */
angular.module('dmInscricoesApp')
  .controller('LoginCtrl', ['UsuarioModel', 'UsuarioService', '$scope', 'AuthService', function (UsuarioModel, UsuarioService, $scope, AuthService) {
    $scope.usuario = new UsuarioModel.Usuario();

    $scope.logar = function(){
      UsuarioService.login($scope.usuario).then(function(retorno){
        AuthService.setUsuario(retorno.data.data[0]);
        console.log(retorno);
      }).catch(function(err){
        console.error(err);
      });
    };
  }]);
