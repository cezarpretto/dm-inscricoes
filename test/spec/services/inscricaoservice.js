'use strict';

describe('Service: InscricaoService', function () {

  // load the service's module
  beforeEach(module('dmInscricoesApp'));

  // instantiate service
  var InscricaoService;
  beforeEach(inject(function (_InscricaoService_) {
    InscricaoService = _InscricaoService_;
  }));

  it('should do something', function () {
    expect(!!InscricaoService).toBe(true);
  });

});
