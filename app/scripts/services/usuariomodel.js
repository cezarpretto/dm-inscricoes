'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.UsuarioModel
 * @description
 * # UsuarioModel
 * Service in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
  .service('UsuarioModel', function () {
    this.Usuario = function(){
      this.grant_type = "password";
      this.username = undefined;
      this.password = undefined;
      this.nome = undefined;
    };
  });
