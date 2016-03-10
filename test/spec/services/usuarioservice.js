'use strict';

describe('Service: UsuarioService', function () {

  // load the service's module
  beforeEach(module('dmInscricoesApp'));

  // instantiate service
  var UsuarioService;
  beforeEach(inject(function (_UsuarioService_) {
    UsuarioService = _UsuarioService_;
  }));

  it('should do something', function () {
    expect(!!UsuarioService).toBe(true);
  });

});
