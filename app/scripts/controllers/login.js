'use strict';

/**
 * @ngdoc function
 * @name dmInscricoesApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dmInscricoesApp
 */
angular.module('dmInscricoesApp')
  .controller('LoginCtrl', ['UsuarioModel', 'UsuarioService', '$scope', 'AuthService', 'growl', function (UsuarioModel, UsuarioService, $scope, AuthService, growl) {
    $scope.usuario = new UsuarioModel.Usuario();

    $scope.logar = function(){
      UsuarioService.login($scope.usuario).then(function(retorno){
        AuthService.setUsuario(retorno.data.data[0]);
        console.log(retorno);
      }).catch(function(err){
        console.error(err);
        if(err.status === 400){
          growl.error('Usuário ou senha incorretos.', {ttl: 4000});
        }else {
          growl.error(err.data.data[0], {ttl: 4000});
        }
      });
    };
  }]);
