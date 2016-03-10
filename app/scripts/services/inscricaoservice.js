'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.InscricaoService
 * @description
 * # InscricaoService
 * Service in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
  .service('InscricaoService', ['$http', 'AuthService', 'API', '$q', function ($http, AuthService, API, $q) {
    var ip = AuthService.ip;
    // var $ = jquery;
    this.post = function(inscricao){
      return $http.post(ip + 'subscribes', inscricao);
    };

    this.put = function(subscribe){
      var deferred = $q.defer();
      API.request('subscribes').update(subscribe.id, subscribe, callback);
      function callback(error, response){
        if(response){
          deferred.resolve(response);
        }else{
          deferred.reject(error);
        }
      };
      return deferred.promise;
    };

    this.get = function(idInscricao){
      return $http.get(ip + 'subscribes/' + idInscricao);
    };

    this.sendMail = function(nome, nrInscricao, email){
      return emailjs.send("gmail", "confimatemplate", {"name": nome, "email_to": email, "product_name": "VI CROD", "nr_inscricao": nrInscricao, "action_url": "http://localhost:9000/#/inscricao/"+nrInscricao});
    };

    this.sendMailConfirmation = function(nome, nrInscricao, email){
      return emailjs.send("gmail", "inscricaoconfirmada", {"name": nome, "email_to": email, "product_name": "VI CROD", "nr_inscricao": nrInscricao, "action_url": "http://localhost:9000/#/inscricao/"+nrInscricao});
    };

    this.getInscricoes = function(){
      return $http.get(ip + 'subscribes');
    };

    this.confirmarInscricao = function(inscricao){
      var deferred = $q.defer();
      API.request('subscribes').update(inscricao.id, inscricao, callback);
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
