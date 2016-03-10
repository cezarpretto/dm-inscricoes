'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.ModalService
 * @description
 * # ModalService
 * Service in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
  .service('ModalService', function () {
    this.show = function(modalId){
      $('#'+modalId).modal('show');
    };

    this.hide = function(modalId){
      $('#'+modalId).modal('hide');
    };
  });
