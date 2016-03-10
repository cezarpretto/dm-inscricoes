'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.AuthService
 * @description
 * # AuthService
 * Service in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
  .service('AuthService', ['$location', '$http', 'API', '$q', 'connectionConfig', function ($location, $http, API, $q, connectionConfig) {
    var self = this;
    this.ip = connectionConfig.ip;
    window.globals = {api_url: this.ip};
    this.usuarioLogado = null;

    this.isLoggedIn = function(){
      self.usuarioLogado = JSON.parse(window.localStorage.getItem('usuarioLogado'));
      if(self.usuarioLogado === null){
        $location.path('/login');
      }
    };

    this.setUsuario = function(usuario){
      self.usuarioLogado = usuario;
      window.localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      $location.path('/mainAdmin');
    };

    this.logout = function(usuario){
      return $http.delete(self.ip + 'access_tokens?access_token=' + self.usuarioLogado.access_token).then(function(retorno){
        self.usuarioLogado = null;
        window.localStorage.setItem('usuarioLogado', JSON.stringify(null));
        $location.path('/login');
      }).catch(function(err){
        console.error(err);
      });

      // API.request('access_tokens').destroy(self.usuarioLogado.id, self.usuarioLogado, callback);
      // function callback(error, response){
      //   if(response){
      //     self.usuarioLogado = null;
      //     window.localStorage.setItem('usuarioLogado', JSON.stringify(null));
      //     $location.path('/login');
      //   }else{
      //     console.error(error);
      //   }
      // };
    };
  }]);
