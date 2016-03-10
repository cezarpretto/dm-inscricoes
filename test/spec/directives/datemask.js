'use strict';

describe('Directive: dateMask', function () {

  // load the directive's module
  beforeEach(module('dmInscricoesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<date-mask></date-mask>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dateMask directive');
  }));
});
