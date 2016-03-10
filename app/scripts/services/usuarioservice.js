'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.UsuarioService
 * @description
 * # UsuarioService
 * Service in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
  .service('UsuarioService', ['$http', 'AuthService', '$q', 'API', function ($http, AuthService, $q, API) {
    var ip = AuthService.ip;
    this.login = function(usuario){
      return $http.post(ip + 'access_tokens', usuario);
    };

    this.logout = function(usuario){
      return $http.delete(ip + 'access_tokens?access_token=' + usuario.access_token);
    };

    this.post = function(usuario){
      return $http.post(ip + 'users', usuario);
    };

    this.get = function(){
      return $http.get(ip + 'users');
    };

    this.delete = function(idUsuario){
      return $http.delete(ip + 'users/' + idUsuario);
    };

    this.put = function(usuario){
      var deferred = $q.defer();
      API.request('users').update(usuario.id, usuario, callback);
      function callback(error, response){
        if(response){
          deferred.resolve(response);
        }else{
          deferred.reject(error);
        }
      };
      return deferred.promise;
    };

  }]);
