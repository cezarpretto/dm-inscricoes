'use strict';

/**
 * @ngdoc service
 * @name dmInscricoesApp.InscricaoModel
 * @description
 * # InscricaoModel
 * Service in the dmInscricoesApp.
 */
angular.module('dmInscricoesApp')
  .service('InscricaoModel', function () {
    var self = this;

    this.Inscricao = function(){
      this.nome = undefined;
      this.email = undefined;
      this.dt_nascimento = undefined;
      this.id_demolay = undefined;
      this.tipo = undefined;
      this.camiseta = undefined;
      this.comprovante = undefined;
      this.cidade = undefined;
      this.capitulo = undefined;
      this.observacao = undefined;
      this.status = undefined;
    };

    this.Email = function(nome, nrInscricao, emailTo){
      this.from = 'Mailgun Sandbox <postmaster@sandbox3a1c02caea91400c9ba048afb6ab2be3.mailgun.org>',
      this.to = nome + ' <' + emailTo + '>';
      this.subject = 'Inscrição VI CROD';
      this.text = self.mailBody(nome, nrInscricao);
    };

    this.mailBody = function(nome, nrInscricao){
      return "<!DOCTYPE html>"
              +"<html>"
              +"  <body>"
              +"    <center>"
              +"<h1>Olá " + nome + ". Sua inscrição com o código " + window.btoa(nrInscricao) + " foi realizada com sucesso!</h1>"
              +"<p>Para efetuar o pagamento você deve realizar um depósito na seguinte conta:</p>"
              +"<p><strong>Sicred</strong></p>"
              +"<p>Agência: </p>"
              +"<p>Conta Poupança:</p>"
              +"<p><strong>Geraldo Antônio Delai</strong></p>"
              +"<h2>Após o depósito clique no link abaixo para confirmar sua inscrição</h2>"
              +"<p><a href=http://demolayab.org/#/inscricao/" + window.btoa(nrInscricao) + " target=_blank>Clique aqui para Confirmar</a></p>"
              +"    </center>"
              +"  </body>"
              +"</html>";
    }
  });
