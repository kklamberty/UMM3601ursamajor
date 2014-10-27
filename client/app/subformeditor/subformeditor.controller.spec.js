'use strict';

describe('Controller: SubformeditorCtrl', function () {

  // load the controller's module
  beforeEach(module('umm3601ursamajorApp'));

  var SubformeditorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubformeditorCtrl = $controller('SubformeditorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
