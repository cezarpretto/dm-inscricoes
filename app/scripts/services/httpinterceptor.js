'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.httpInterceptor
 * @description
 * # httpInterceptor
 * Factory in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
.factory('httpInterceptor',['$q', '$rootScope', function ($q, $rootScope) {
return {
    'request': function(config){
      // console.log(config);
      return config || $q.when(config);
    },
    'responseError': function(rejection) {
      if(rejection.status === -1){
        rejection.data = 'Não foi possível estabelecer uma conexão com o servidor!';
      }
      return $q.reject(rejection);
     },
     'response': function(response) {
      //  console.log(response);
       return response;
     }
 };
}]);
