'use strict';

describe('Service: UsuarioModel', function () {

  // load the service's module
  beforeEach(module('dmInscricoesApp'));

  // instantiate service
  var UsuarioModel;
  beforeEach(inject(function (_UsuarioModel_) {
    UsuarioModel = _UsuarioModel_;
  }));

  it('should do something', function () {
    expect(!!UsuarioModel).toBe(true);
  });

});
