'use strict';

describe('Controller: MainadminCtrl', function () {

  // load the controller's module
  beforeEach(module('dmInscricoesApp'));

  var MainadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainadminCtrl = $controller('MainadminCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MainadminCtrl.awesomeThings.length).toBe(3);
  });
});
