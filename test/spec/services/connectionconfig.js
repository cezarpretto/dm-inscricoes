'use strict';

describe('Service: connectionConfig', function () {

  // load the service's module
  beforeEach(module('dmInscricoesApp'));

  // instantiate service
  var connectionConfig;
  beforeEach(inject(function (_connectionConfig_) {
    connectionConfig = _connectionConfig_;
  }));

  it('should do something', function () {
    expect(!!connectionConfig).toBe(true);
  });

});
