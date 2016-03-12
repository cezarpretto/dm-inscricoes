'use strict';

/**
 * @ngdoc function
 * @name dmInscricoesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dmInscricoesApp
 */
angular.module('dmInscricoesApp')
  .controller('MainCtrl', ['NgMap', '$scope', '$location', function (NgMap, $scope, $location) {
    $scope.buscaEmail = function(email){
      $location.path('/inscricao/ZW1haWw=/' + email);
    };
  }]);
