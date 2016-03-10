'use strict';

/**
 * @ngdoc function
 * @name dmInscricoesApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the dmInscricoesApp
 */
angular.module('dmInscricoesApp')
  .controller('UsuariosCtrl', ['$scope', 'AuthService', 'UsuarioService', 'ModalService', 'UsuarioModel', 'growl', function ($scope, AuthService, UsuarioService, ModalService, UsuarioModel, growl) {
    AuthService.isLoggedIn();
    $scope.usuarios = [];
    $scope.usuariosAux = [];
    $scope.usuario = new UsuarioModel.Usuario();
    $scope.isNew = true;
    function init(){
      UsuarioService.get().then(function (retorno) {
        $scope.usuarios = retorno.data.data;
        $scope.usuariosAux = $scope.usuarios;
      }).catch(function (err) {
        growl.error(err.data.error);
        console.error(err);
      });
    };
    init();

    $scope.salvar = function(){
      if($scope.isNew){
        UsuarioService.post($scope.usuario).then(function(retorno){
          init();
          ModalService.hide('modalNewUser');
        }).catch(function(err){
          growl.error(err.data.error);
          console.error(err);
        });
      }else{
        UsuarioService.put($scope.usuario).then(function(retorno){
          init();
          ModalService.hide('modalNewUser');
        }).catch(function(err){
          growl.error(err.data.error);
          console.error(err);
        });
      }
    };

    $scope.novo = function(){
      $scope.usuario = new UsuarioModel.Usuario();
      $scope.isNew = true;
      ModalService.show('modalNewUser');
    };

    $scope.selecionaUsuario = function(usuario){
      $scope.usuario = usuario;
      $scope.isNew = false;
      ModalService.show('modalNewUser');
    };

    $scope.deleteUsuario = function(usuario){
      if(window.confirm('Tem certeza que deseja remover o usuario ' + usuario.name + '?')){
        UsuarioService.delete(usuario.id).then(function(retorno){
          init();
          growl.success('Usuario removido!', {ttl: 4000});
        }).catch(function(err){
          growl.error(err.data.error);
          console.error(err);
        });
      }
    };
  }]);
