'use strict';

describe('Service: InscricaoModel', function () {

  // load the service's module
  beforeEach(module('dmInscricoesApp'));

  // instantiate service
  var InscricaoModel;
  beforeEach(inject(function (_InscricaoModel_) {
    InscricaoModel = _InscricaoModel_;
  }));

  it('should do something', function () {
    expect(!!InscricaoModel).toBe(true);
  });

});
